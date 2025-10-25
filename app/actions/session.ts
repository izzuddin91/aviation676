"use server";

import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { getAuth, signInWithEmailAndPassword, setPersistence, browserLocalPersistence } from "firebase/auth";
import app from "@/app/clientApp";

const auth = getAuth(app);
const secretKey = new TextEncoder().encode("secret");

async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .sign(secretKey);
}

async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, secretKey, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function loginAction(formData: FormData) {
  console.log("expires")
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    console.log("expires")
    // ✅ Persistent Firebase auth
    await setPersistence(auth, browserLocalPersistence);

    // 1️⃣ Firebase sign-in
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // 2️⃣ Prepare user data
    const userData = {
      uid: user.uid,
      email: user.email,
      name: user.displayName || "Aviation Enthusiast",
    };

    // 3️⃣ Get cookie store
    const cookieStore = cookies();

    // 🔥 Force remove any old session cookie first
    (await cookieStore).set("session", "", {
      path: "/",
      expires: new Date(0),
    });

    // 4️⃣ Create new long-term session cookie (10 years)
    const expires = new Date(Date.now() + 10 * 365 * 24 * 60 * 60 * 1000);
    console.log(expires)
    const session = await encrypt({ user: userData });

    // 5️⃣ Save the new cookie
    (await cookieStore).set("session", session, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      expires,
    });

    console.log("✅ Session cookie set. Expiry:", expires.toISOString());

    return { success: true, user: userData };
  } catch (error: any) {
    console.error("Firebase login failed:", error.message);
    throw new Error("Invalid email or password");
  }
}

export async function logoutAction() {
  const cookieStore = cookies();
  (await cookieStore).set("session", "", {
    path: "/",
    expires: new Date(0),
  });
}

export async function getSessionAction() {
  const cookieStore = cookies();
  const session = (await cookieStore).get("session")?.value;
  if (!session) return null;

  try {
    return await decrypt(session);
  } catch (error) {
    console.error("Session decryption failed:", error);
    return null;
  }
}

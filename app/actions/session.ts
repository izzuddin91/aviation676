"use server";

import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "@/app/clientApp";
import { setPersistence, browserLocalPersistence, browserSessionPersistence } from "firebase/auth";

const auth = getAuth(app);
const secretKey = new TextEncoder().encode("secret");

async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(secretKey);
}

async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, secretKey, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    // 1️⃣ Sign in with Firebase
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // 2️⃣ Prepare data for session cookie
    const userData = {
      uid: user.uid,
      email: user.email,
      name: user.displayName || "Aviation Enthusiast", // fallback if no displayName
    };

    // 3️⃣ Create JWT token
    const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    const session = await encrypt({ user: userData, expires });

    // 4️⃣ Store in secure HTTP-only cookie
    (await cookies()).set("session", session, {
      expires,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    // For a session that survives reloads and closes (i.e. “remember me”):
    return { success: true, user: userData };
  } catch (error: any) {
    console.error("Firebase login failed:", error.message);
    throw new Error("Invalid email or password");
  }
}

export async function logoutAction() {
  (await cookies()).set("session", "", { expires: new Date(0) });
}

export async function getSessionAction() {
  const session = (await cookies()).get("session")?.value;
  if (!session) return null;
  try {
    return await decrypt(session);
  } catch {
    return null;
  }
}

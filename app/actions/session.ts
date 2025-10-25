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
  const { payload } = await jwtVerify(input, secretKey, { algorithms: ["HS256"] });
  return payload;
}

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await setPersistence(auth, browserLocalPersistence);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userData = {
      uid: user.uid,
      email: user.email,
      name: user.displayName || "Aviation Enthusiast",
    };

    const session = await encrypt({ user: userData });

    // 🔥 Cookie valid for 10 years
    const expires = new Date(Date.now() + 10 * 365 * 24 * 60 * 60 * 1000);
    (await cookies()).set("session", session, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      expires,
    });

    // ✅ Return only plain object (serializable)
    return { success: true, user: userData };
  } catch (error: any) {
    console.error("Firebase login failed:", error.message);
    throw new Error("Invalid email or password");
  }
}

export async function logoutAction() {
  (await cookies()).set("session", "", { path: "/", expires: new Date(0) });
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

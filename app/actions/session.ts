"use server";

import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

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
  const email = formData.get("email");
  const name = "John"; // In real case, fetch from DB

  const user = { email, name };
  const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
  const session = await encrypt({ user, expires });

  (await cookies()).set("session", session, { expires, httpOnly: true });
}

export async function logoutAction() {
  (await cookies()).set("session", "", { expires: new Date(0) });
}

export async function getSessionAction() {
  const session = (await cookies()).get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

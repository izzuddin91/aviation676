import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("10 sec from now")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function login(formData: FormData) {
  // Verify credentials && get the user

  const user = { email: formData.get("email"), name: "John" };

  // Create the session
  const expires = new Date(Date.now() + 10 * 365 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ user, expires });

  // Save the session in a cookie
  (await
        // Save the session in a cookie
        cookies()).set("session", session, { expires, httpOnly: true });
}

export async function logout() {
  // Destroy the session
  (await
        // Destroy the session
        cookies()).set("session", "", { expires: new Date(0) });
}

export async function getSession() {
  const session = (await cookies()).get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  const res = NextResponse.next();

  if (!session) {
    // No session cookie — nothing to refresh
    return res;
  }

  try {
    // ✅ Verify the token is valid
    await jwtVerify(session, key, { algorithms: ["HS256"] });

    // ⚠️ Do not reissue or overwrite cookie every request.
    // Just return the response — session stays as-is.
    return res;
  } catch (error) {
    console.error("Session invalid or expired:", error);
    // If invalid, clear it
    res.cookies.set({
      name: "session",
      value: "",
      expires: new Date(0),
      path: "/",
    });
    return res;
  }
}

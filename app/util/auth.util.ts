
'use server'
 
import { cookies } from 'next/headers'
import secureLocalStorage from "react-secure-storage";
import { SignJWT, jwtVerify } from "jose";
// import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


interface SessionAuth {
  accessToken: string;
  refreshToken: string;
}

const secretKey = 'secret';
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any){
  return await new SignJWT(payload)
  .setProtectedHeader({alg: "HS256"})
  .setIssuedAt()
  .setExpirationTime("10 sec from now")
  .sign(key)

}

export const login = async (username: string, password: string, uid: string, session: String) => {
  // secureLocalStorage.setItem("uid", uid);
  // secureLocalStorage.setItem("session", session);

  // create the session 
  const user = { name: username, password: password }
  const expires = new Date(Date.now() + 300 * 1000)
  const session2 = await encrypt({user, expires})
 

  cookies().set({
    name: 'session',
    value: session2,
    httpOnly: true,
    expires: expires,
    // path: '/houseList',
  })

};

export const isAuthAuthorized = (): boolean => {
  const session = secureLocalStorage.getItem("session") as SessionAuth;
  // console.log(session)
  // return !!session;
  return true
};

export const getUserAuth = (): string => {
  return secureLocalStorage.getItem("uid") as string;
};

export const getAccessToken = (): string => {
  const session = secureLocalStorage.getItem("session") as SessionAuth;
  return session.accessToken;
};

export const clearAuth = () => {
  cookies().set({
    name: 'session',
    value: '',
    expires: new Date(0),
    httpOnly: true,
    // path: '/',
  })
  secureLocalStorage.clear();
};

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 10 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}

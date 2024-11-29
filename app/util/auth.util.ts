'use server';

import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';

const secretKey = 'secret';
const key = new TextEncoder().encode(secretKey);

interface SessionAuth {
  accessToken: string;
  refreshToken: string;
}

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('15m')
    .sign(key);
}

export async function decrypt(token: string): Promise<any> {
  const { payload } = await jwtVerify(token, key, {
    algorithms: ['HS256'],
  });
  return payload;
}

export const login = async (
  username: string,
  password: string,
  uid: string
) => {
  console.log('Logging in user:', username);

  // Create the session payload
  const sessionPayload = { uid, username };
  const sessionToken = await encrypt(sessionPayload);

  // Set session cookie
  const expires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
  cookies().set({
    name: 'session',
    value: sessionToken,
    httpOnly: true,
    expires,
    secure: process.env.NODE_ENV === 'production', // Secure flag in production
    path: '/',
  });

  console.log('Session created for user:', username);
};

export const isAuthAuthorized = async (): Promise<boolean> => {
  const session = cookies().get('session')?.value;
  if (!session) return false;

  try {
    const payload = await decrypt(session);
    return !!payload;
  } catch (error) {
    console.error('Failed to verify session:', error);
    return false;
  }
};

export const getUserAuth = async (): Promise<any> => {
  const session = cookies().get('session')?.value;
  if (!session) return null;

  try {
    const payload = await decrypt(session);
    return payload.uid;
  } catch (error) {
    console.error('Failed to retrieve user auth:', error);
    return null;
  }
};

export const clearAuth = () => {
  cookies().set({
    name: 'session',
    value: '',
    expires: new Date(0), // Expire the cookie immediately
    httpOnly: true,
    path: '/',
  });

  console.log('Session cleared.');
};

export async function getSession() {
  const cookieStore = cookies();
  const session = cookieStore.get('session')?.value;  // Getting the session cookie

  if (!session) {
    return null;
  }

  try {
    return await decrypt(session); // If session exists, decrypt it
  } catch (error) {
    console.error('Failed to get session:', error);
    return null;
  }
}

// export async function getSession() {
//   const session = cookies().get('session')?.value;
//   if (!session) return null;

//   try {
//     return await decrypt(session);
//   } catch (error) {
//     console.error('Failed to get session:', error);
//     return null;
//   }
// }

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get('session')?.value;
  if (!session) return;

  try {
    const payload = await decrypt(session);

    // Extend the session expiration
    payload.expires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
    const updatedToken = await encrypt(payload);

    const res = NextResponse.next();
    res.cookies.set({
      name: 'session',
      value: updatedToken,
      httpOnly: true,
      expires: new Date(payload.expires),
      path: '/',
    });

    console.log('Session updated.');
    return res;
  } catch (error) {
    console.error('Failed to update session:', error);
  }
}

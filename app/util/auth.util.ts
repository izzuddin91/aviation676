import secureLocalStorage from "react-secure-storage";

interface SessionAuth {
  accessToken: string;
  refreshToken: string;
}

export const setAuth = (uid: string, session: String) => {
  secureLocalStorage.setItem("uid", uid);
  secureLocalStorage.setItem("session", session);
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
  secureLocalStorage.clear();
};

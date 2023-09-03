import secureLocalStorage from "react-secure-storage";

interface SessionAuth {
  accessToken: string;
  refreshToken: string;
}

export const setAuth = (user: string, session: String) => {
    console.log('in here')
  secureLocalStorage.setItem("user", user);
  secureLocalStorage.setItem("session", session);
};

export const isAuthAuthorized = (): boolean => {
  const session = secureLocalStorage.getItem("session") as SessionAuth;
  // console.log(session)
  // return !!session;
  return true
};

export const getUserAuth = (): string => {
  return secureLocalStorage.getItem("user") as string;
};

export const getAccessToken = (): string => {
  const session = secureLocalStorage.getItem("session") as SessionAuth;
  return session.accessToken;
};

export const clearAuth = () => {
  secureLocalStorage.clear();
};

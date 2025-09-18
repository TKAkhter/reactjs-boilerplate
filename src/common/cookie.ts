import Cookies from "js-cookie";

export const setTokenCookie = (token: string) => {
  Cookies.set("token", token, { expires: 1 });
};

export const getTokenFromCookie = () => {
  return Cookies.get("token");
};

export const removeTokenCookie = () => {
  Cookies.remove("token");
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setUserCookie = (user: any) => {
  Cookies.set("user", JSON.stringify(user), { expires: 1 });
};

export const getUserFromCookie = () => {
  const user = Cookies.get("user");
  return user ? JSON.parse(user) : null; // Parse the serialized user string back to an object
};

export const removeUserCookie = () => {
  Cookies.remove("user");
};

import Cookies from "js-cookie";

export function getSession() {
  const session = Cookies.get("session_internal");
  if (!session) return null;
  return session;
}

export async function login(data: string) {
  Cookies.set("session_internal", data, {
    expires: process.env.NODE_ENV === "development" ? 7 : 1,
  });
}

export async function logout() {
  Cookies.remove("session_internal");
}

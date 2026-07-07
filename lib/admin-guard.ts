import { cookies } from "next/headers";
import { SESSION_COOKIE, verifyToken } from "./auth";

/** True if the current request carries a valid admin session cookie. */
export function isAdmin(): boolean {
  const token = cookies().get(SESSION_COOKIE)?.value;
  return verifyToken(token);
}

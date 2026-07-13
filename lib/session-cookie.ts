// Edge-safe constant — imported by middleware, which must not pull in
// Node-only modules like "crypto" (see lib/auth.ts for the full auth logic).
export const SESSION_COOKIE = "ar_admin";

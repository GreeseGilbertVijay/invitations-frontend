export type UserRole = "customer" | "admin" | "superadmin";

interface JwtPayload {
  id: string;
  role?: UserRole;
  exp?: number;
}

function decodeJwt(token: string): JwtPayload | null {
  try {
    return JSON.parse(atob(token.split(".")[1])) as JwtPayload;
  } catch {
    return null;
  }
}

export function getTokenPayload(): JwtPayload | null {
  const token = localStorage.getItem("token");
  if (!token) return null;
  return decodeJwt(token);
}

export function getUserRole(): UserRole {
  return getTokenPayload()?.role ?? "customer";
}

export function isSuperAdmin(): boolean {
  return getUserRole() === "superadmin";
}

import { baseUrl } from "@/lib/api";
import { Role } from "@/types/auth.types";

export function getRoleBaseUrl(role?: Role) {
  if (!role) return baseUrl;

  return `${baseUrl}/${role}`;
}

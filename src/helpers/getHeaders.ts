export function getHeaders({ token }: { token?: string | null }) {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

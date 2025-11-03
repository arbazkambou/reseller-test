import { fetchUser } from "@/services/auth.services";
import UserBalance from "./UserBalance";

async function GetUserBalance() {
  const user = await fetchUser();
  return <UserBalance user={user} />;
}

export default GetUserBalance;

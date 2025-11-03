import { fetchUser } from "@/services/auth.services";
import { NavUser } from "../user/NavUser";

async function GetUser() {
  const user = await fetchUser();
  return <NavUser user={user} />;
}

export default GetUser;

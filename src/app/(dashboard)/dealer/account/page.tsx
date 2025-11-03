import AccountUpdateForm from "@/components/features/user/AccountUpdateForm";
import { auth } from "@/lib/auth";
import { fetchUser } from "@/services/auth.services";

async function Page() {
  const session = await auth();
  const user = await fetchUser();
  return (
    <AccountUpdateForm isDealer={session?.user.role === "dealer"} user={user} />
  );
}

export default Page;

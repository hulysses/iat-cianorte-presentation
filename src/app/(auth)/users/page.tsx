import { getUsers, userIsAdmin } from "@/app/actions/users/actions";
import Users from "./users-page";

export default async function UsersPage() {
  const { data: users = [] } = await getUsers();
  const isAdmin = await userIsAdmin();

  return <Users initialUsers={users} isAdmin={isAdmin?.data?.is_admin} />;
}

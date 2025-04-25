import { getUsers } from "@/app/actions/users/actions";
import Users from "./users-page";

export default async function UsersPage() {
  const { data: users = [] } = await getUsers();
  return <Users initialUsers={users} />;
}

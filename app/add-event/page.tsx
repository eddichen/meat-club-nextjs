import { getUsers } from "@/lib/users";
import AddEventForm from "@/components/add-event-form";

export default async function AddEvent() {
  const userData = await getUsers();
  const { rows: users } = userData;

  return <AddEventForm users={users as Users[]} />;
}

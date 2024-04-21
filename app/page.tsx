import { EventsByUser } from "@/components/events-by-user";
import { getEvents } from "@/lib/events";
import { getUsers } from "@/lib/users";

export const runtime = "edge";
export const preferredRegion = "home";
export const dynamic = "force-dynamic";

export default async function Home() {
  const usersData = await getUsers();
  const eventsData = await getEvents();

  const { rows: users } = usersData;
  const { rows: events } = eventsData;

  return (
    <main>
      <EventsByUser users={users as Users[]} events={events as EventData[]} />
    </main>
  );
}

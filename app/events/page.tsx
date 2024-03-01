import EventsItem from "@/components/events-item";
import { EventsMap } from "@/components/events-map";
import EventsTable from "@/components/events-table";
import { getEvents } from "@/lib/events";

export default async function Events() {
  const eventsData = await getEvents();

  const { rows: events } = eventsData;

  return (
    <>
      <EventsMap events={events as Event[]} />
      <h1>Meat Club Events</h1>
      <EventsTable>
        <EventsItem events={events as Event[]} />
      </EventsTable>
    </>
  );
}

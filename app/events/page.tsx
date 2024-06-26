import EventsItem from "@/components/events-item";
import EventsTable from "@/components/events-table";
import { getEvents } from "@/lib/events";
import { Container } from "@mui/material";

export default async function Events() {
  const eventsData = await getEvents();

  const { rows: events } = eventsData;

  return (
    <Container maxWidth="lg">
      <h1>Meat Club Events</h1>
      <EventsTable>
        <EventsItem events={events as MeatClubEvent[]} />
      </EventsTable>
    </Container>
  );
}

import RefreshButton from "./refresh-button";
import { getEvents } from "@/lib/events";

export default async function Table() {
  const eventsData = await getEvents();

  const { rows: events } = eventsData;

  return (
    <div>
      <div>
        <div>
          <h2>Events</h2>
        </div>
        <RefreshButton />
      </div>
      <div>
        {events.map((event) => (
          <div key={event.eventnumber}>
            <div>
              <div>
                <p>{event.eventnumber}</p>
                <p>{event.date}</p>
                <p>{event.residency}</p>
                <p>{event.venue}</p>
                <p>
                  {event.lat}, {event.lng}
                </p>
                <p>{event.address}</p>
                <p>{event.chosenby}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { sql } from "@vercel/postgres";

export async function createEvents() {
  const createTable = await sql`
    CREATE TABLE IF NOT EXISTS events (
      id SERIAL PRIMARY KEY,
      eventNumber INT NOT NULL,
      date VARCHAR(255) NOT NULL,
      venueId INT NOT NULL,
      chosenBy INT,
      "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
    `;

  console.log(`Created "events" table`);

  return {
    createTable,
  };
}

export async function getEvents() {
  let eventsData;

  const query = sql`
  SELECT
    e.eventNumber,
    e.date,
    l.residency,
    l.venue,
    l.lat,
    l.lng,
    u.name AS chosenBy
  FROM
    events e
    LEFT JOIN locations l ON l.id = e.venueId
    LEFT JOIN users u ON u.id = e.chosenBy
  ORDER BY
    e.eventNumber DESC
`;

  try {
    eventsData = await query;
  } catch (e: any) {
    if (e.message.includes('relation "events" does not exist')) {
      console.log(
        "Table does not exist, creating and seeding it with dummy data now...",
      );
      // Table is not created yet
      await createEvents();
      eventsData = await query;
    } else {
      throw e;
    }
  }

  return eventsData;
}

export async function addEvent(eventData: EventData) {
  const { eventNumber, date, venueId, chosenBy } = eventData;

  const addEventRow = await sql`
  INSERT INTO events (eventNumber, date, venueId, chosenBy)
  VALUES (${eventNumber}, ${date}, ${venueId}, ${chosenBy})
  `;
}

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

  const events = await Promise.all([
    sql`
          INSERT INTO events (eventNumber, date, venueId, chosenBy)
          VALUES (1, '01/06/2011', 1, 6)
      `,
    sql`
          INSERT INTO events (eventNumber, date, venueId, chosenBy)
          VALUES (10, '06/03/2012', 4, 8)
    `,
    sql`
          INSERT INTO events (eventNumber, date, venueId, chosenBy)
          VALUES (22, '05/03/2013', 2, 7)
    `,
  ]);
  console.log(`Seeded ${events.length} events`);

  return {
    createTable,
    events,
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
    l.address,
    u.name AS chosenBy
  FROM
    events e
    LEFT JOIN locations l ON l.id = e.venueId
    LEFT JOIN users u ON u.id = e.chosenBy
  ORDER BY
    e.eventNumber
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

import { sql } from "@vercel/postgres";

export async function createLocations() {
  const createTable = await sql`
    CREATE TABLE IF NOT EXISTS locations (
      id SERIAL PRIMARY KEY,
      residency VARCHAR(255),
      venue VARCHAR(255) NOT NULL,
      address VARCHAR(255),
      "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
    `;

  console.log(`Created "locations" table`);

  const locations = await Promise.all([
    sql`
          INSERT INTO locations (residency, venue, address)
          VALUES (null, 'Hawksmoor', '157A Commercial St, London E1 6BJ')
      `,
    sql`
          INSERT INTO locations (residency, venue, address)
          VALUES ('Lucky Fried Chicken', 'Grafton Kentish Town', '20 Prince of Wales Road, Kentish Town, London, NW5 3LG')
    `,
    sql`
          INSERT INTO locations (residency, venue, address)
          VALUES (null, 'Pitt Cue Co', '1 Newburgh St, Carnaby, London W1F 7RB')
    `,
  ]);
  console.log(`Seeded ${locations.length} locations`);

  return {
    createTable,
    locations,
  };
}

export async function getLocations() {
  let locationsData;

  try {
    locationsData = await sql`SELECT * FROM locations`;
  } catch (e: any) {
    if (e.message.includes('relation "locations" does not exist')) {
      console.log(
        "Table does not exist, creating and seeding it with dummy data now...",
      );
      // Table is not created yet
      await createLocations();
      locationsData = await sql`SELECT * FROM locations`;
    } else {
      throw e;
    }
  }

  return locationsData;
}

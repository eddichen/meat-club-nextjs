import { sql } from "@vercel/postgres";

export async function createLocations() {
  const createTable = await sql`
    CREATE TABLE IF NOT EXISTS locations (
      id SERIAL PRIMARY KEY,
      residency VARCHAR(255),
      venue VARCHAR(255) NOT NULL,
      lat FLOAT,
      lng FLOAT,
      "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
    `;

  console.log(`Created "locations" table`);

  return {
    createTable,
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

export async function getSingleLocation(name: string | undefined) {
  if (!name) return;

  let location;

  try {
    location = await sql`SELECT * FROM locations WHERE venue = ${name}`;
  } catch (e: any) {
    console.error("Something whent wrong fetching that location: ", e);
  }
  return location;
}

export async function setLocation(locationData: VenueWithResidency) {
  const { residency, name, lat, lng } = locationData;

  const findLocation = await sql`
    SELECT venue FROM locations WHERE venue = ${name}
  `;

  if (findLocation.rowCount >= 1) return;

  const addLocation = await sql`
    INSERT INTO locations (residency, venue, lat, lng)
    VALUES (${residency}, ${name}, ${lat}, ${lng})
  `;

  return addLocation;
}

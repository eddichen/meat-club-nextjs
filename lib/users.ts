import { sql } from "@vercel/postgres";

export async function createUsers() {
  const createTable = await sql`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
    `;

  console.log(`Created "users" table`);

  const users = await Promise.all([
    sql`
          INSERT INTO users (name)
          VALUES ('Barry')
      `,
    sql`
          INSERT INTO users (name)
          VALUES ('Chris');
      `,
    sql`
          INSERT INTO users (name)
          VALUES ('Dave');
      `,
    sql`
          INSERT INTO users (name)
          VALUES ('Eddi');
      `,
    sql`
          INSERT INTO users (name)
          VALUES ('Gareth');
      `,
    sql`
          INSERT INTO users (name)
          VALUES ('James');
      `,
    sql`
          INSERT INTO users (name)
          VALUES ('Luke');
      `,
    sql`
          INSERT INTO users (name)
          VALUES ('Pete');
      `,
    sql`
          INSERT INTO users (name)
          VALUES ('Seb');
      `,
    sql`
          INSERT INTO users (name)
          VALUES ('Taylor');
      `,
    sql`
          INSERT INTO users (name)
          VALUES ('Terry');
      `,
  ]);
  console.log(`Seeded ${users.length} users`);

  return {
    createTable,
    users,
  };
}

export async function getUsers() {
  let usersData;

  try {
    usersData = await sql`SELECT * FROM users`;
  } catch (e: any) {
    if (e.message.includes('relation "users" does not exist')) {
      console.log(
        "Table does not exist, creating and seeding it with dummy data now...",
      );
      // Table is not created yet
      await createUsers();
      usersData = await sql`SELECT * FROM users`;
    } else {
      throw e;
    }
  }

  return usersData;
}

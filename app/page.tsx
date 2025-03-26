import { EventsByUser } from "@/components/events-by-user";
import { EventsPerYear } from "@/components/events-per-year";
import { NextEvent } from "@/components/next-event";
import { getEvents } from "@/lib/events";
import { getUsers } from "@/lib/users";
import { Button, Card, CardHeader, Container, Stack } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Link from "next/link";

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
      <Container>
        <Grid container spacing={4}>
          <Grid xs={12} md={6}>
            <Card variant="outlined">
              <NextEvent
                users={users as Users[]}
                events={events as EventData[]}
              />
            </Card>
          </Grid>
          <Grid container xs={12} md={6}>
            <Grid xs={6}>
              <Link href="/events">
                <Button variant="contained" fullWidth>
                  View All Events
                </Button>
              </Link>
            </Grid>
            <Grid xs={6}>
              <Link href="/add-event">
                <Button variant="contained" fullWidth>
                  Add New Event
                </Button>
              </Link>
            </Grid>
          </Grid>
          <Grid xs={12} md={6}>
            <Card variant="outlined">
              <CardHeader title="Meatclubs Chosen Leaderboard" />
              <EventsByUser
                users={users as Users[]}
                events={events as EventData[]}
              />
            </Card>
          </Grid>
          <Grid xs={12} md={6}>
            <Card variant="outlined">
              <CardHeader title="Meatclubs Per Year" />
              <EventsPerYear events={events as EventData[]} />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
}

import { EventsByUser } from "@/components/events-by-user";
import { EventsMap } from "@/components/events-map";
import { EventsPerYear } from "@/components/events-per-year";
import { getEvents } from "@/lib/events";
import { getUsers } from "@/lib/users";
import { Card, CardHeader, Container } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

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
          <Grid xs={12}>
            <Card variant="outlined">
              <EventsMap events={events as MeatClubEvent[]} />
            </Card>
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

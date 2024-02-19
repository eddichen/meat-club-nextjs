"use client";

import { APIProvider } from "@vis.gl/react-google-maps";
import { Container, TextField, Button, Grid } from "@mui/material";
import ChosenByField from "./chosen-by-field";
import VenueField from "./venue-field";

export default function AddEventForm({ users }: { users: Users[] }) {
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "";

  return (
    <APIProvider apiKey={API_KEY}>
      <Container maxWidth="xs">
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <VenueField />
          </Grid>
          <Grid item>
            <TextField
              label="Name"
              helperText="For Pop-ups and Residencies in Venues"
              fullWidth
            />
          </Grid>
          <Grid item>
            <TextField
              required
              label="date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item>
            <ChosenByField users={users} />
          </Grid>
          <Grid item>
            <Button variant="contained" size="large" fullWidth>
              Add Event
            </Button>
          </Grid>
        </Grid>
      </Container>
    </APIProvider>
  );
}

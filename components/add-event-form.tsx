"use client";

import { useState } from "react";
import { APIProvider } from "@vis.gl/react-google-maps";
import { Container, TextField, Button, Grid } from "@mui/material";
import ChosenByField from "./chosen-by-field";
import VenueField from "./venue-field";
import { QueryResultRow } from "@vercel/postgres";

type AddEventFormProps = {
  getUserOptions: () => Promise<QueryResultRow[]>;
  addLocation: (venueData: Venue, eventData: FormData) => void;
};

export default function AddEventForm({
  getUserOptions,
  addLocation,
}: AddEventFormProps) {
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "";
  const [venueData, setVenueData] = useState({} as Venue);

  const handleVenue = ({ name, lat, lng }: Venue) => {
    setVenueData({ name, lat, lng });
  };

  const addLocationWithVenue = addLocation.bind(null, venueData);

  return (
    <APIProvider apiKey={API_KEY}>
      <Container maxWidth="xs">
        <form action={addLocationWithVenue}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <VenueField handleVenue={handleVenue} />
            </Grid>
            <Grid item>
              <TextField
                label="Residency"
                helperText="For Pop-ups and Residencies in Venues"
                fullWidth
                name="residency"
              />
            </Grid>
            <Grid item>
              <TextField
                required
                label="Date"
                type="date"
                fullWidth
                name="date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Meat Club Number"
                fullWidth
                name="eventNumber"
              />
            </Grid>
            <Grid item>
              <ChosenByField getUserOptions={getUserOptions} />
            </Grid>
            <Grid item>
              <Button type="submit" variant="contained" size="large" fullWidth>
                Add Event
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </APIProvider>
  );
}

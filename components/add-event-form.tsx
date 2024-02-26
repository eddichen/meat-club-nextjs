"use client";

import { useState } from "react";
import { APIProvider } from "@vis.gl/react-google-maps";
import { Container, TextField, Button, Grid } from "@mui/material";
import ChosenByField from "./chosen-by-field";
import VenueField from "./venue-field";
import { QueryResultRow } from "@vercel/postgres";

type AddEventFormProps = {
  getUserOptions: () => Promise<QueryResultRow[]>;
  addLocation: (eventData: EventsFormData) => void;
};

export type HandleVenueProps = {
  name: string;
  venue: Venue;
};

export default function AddEventForm({
  getUserOptions,
  addLocation,
}: AddEventFormProps) {
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "";
  const [eventData, setEventData] = useState({} as EventsFormData);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEventData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleVenue = ({ name, venue }: HandleVenueProps) => {
    setEventData((prevData) => ({ ...prevData, [name]: venue }));
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (Object.keys(eventData).length < 1)
      return console.error("There has been an error retreiving the data");
    addLocation(eventData);
  };

  return (
    <APIProvider apiKey={API_KEY}>
      <Container maxWidth="xs">
        <form onSubmit={handleSubmit}>
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
                onInput={handleChange}
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
                onInput={handleChange}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Meat Club Number"
                fullWidth
                name="eventNumber"
                onInput={handleChange}
              />
            </Grid>
            <Grid item>
              <ChosenByField
                getUserOptions={getUserOptions}
                handleChange={handleChange}
              />
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

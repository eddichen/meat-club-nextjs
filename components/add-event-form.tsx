"use client";

import { useState } from "react";
import { APIProvider } from "@vis.gl/react-google-maps";
import { Container, TextField, Button, Grid } from "@mui/material";
import ChosenByField from "./chosen-by-field";
import VenueField from "./venue-field";

export type HandleFormProps = {
  name: string;
  venue: google.maps.places.PlaceResult | undefined;
};

export default function AddEventForm({ users }: { users: Users[] }) {
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "";
  const [eventData, setEventData] = useState({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEventData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleVenue = ({ name, venue }: HandleFormProps) => {
    setEventData((prevData) => ({ ...prevData, [name]: venue }));
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log("eventData", eventData);
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
                label="Name"
                helperText="For Pop-ups and Residencies in Venues"
                fullWidth
                name="name"
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
              <ChosenByField users={users} handleChange={handleChange} />
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

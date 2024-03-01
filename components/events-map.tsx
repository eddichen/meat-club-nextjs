"use client";

import { APIProvider, AdvancedMarker } from "@vis.gl/react-google-maps";
import { LocationMap } from "./location-map";
import { Box } from "@mui/material";

export const EventsMap = ({ events }: { events: Event[] }) => {
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "";

  return (
    <APIProvider apiKey={API_KEY}>
      <Box sx={{ height: "360px", mb: 2 }}>
        <LocationMap>
          {events.map((event: Event, i: number) => (
            <AdvancedMarker
              key={i}
              position={{
                lat: event.lat,
                lng: event.lng,
              }}
              title={event.venue}
            />
          ))}
        </LocationMap>
      </Box>
    </APIProvider>
  );
};

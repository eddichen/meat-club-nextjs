"use client";

import { useCallback, useState } from "react";
import {
  APIProvider,
  AdvancedMarker,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { LocationMap } from "./location-map";
import { Box } from "@mui/material";
import { EventsMapBounds } from "./events-map-bounds";
import { getFormattedDate } from "@/utils/date";

export const EventsMap = ({ events }: { events: MeatClubEvent[] }) => {
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "";

  const [infoWindowShown, setInfoWindowShown] = useState(false);
  const [infoWindowData, setInfoWindowData] = useState({} as MeatClubEvent);

  const handleMarkerClick = (event: MeatClubEvent) => {
    setInfoWindowData(event);
    setInfoWindowShown((isShown) => !isShown);
  };

  return (
    <APIProvider apiKey={API_KEY}>
      <Box sx={{ height: "360px", mb: 2 }}>
        <LocationMap>
          <EventsMapBounds events={events} />
          {events.map((event: MeatClubEvent, i: number) => (
            <>
              <AdvancedMarker
                key={i}
                position={{
                  lat: event.lat,
                  lng: event.lng,
                }}
                onClick={() => handleMarkerClick(event)}
              />
            </>
          ))}
          {infoWindowShown && (
            <InfoWindow
              position={{
                lat: infoWindowData.lat,
                lng: infoWindowData.lng,
              }}
              pixelOffset={new google.maps.Size(0, -40)}
            >
              <h3>
                {infoWindowData.eventnumber}
                {". "}
                {infoWindowData.residency
                  ? `${infoWindowData.residency}, ${infoWindowData.venue}`
                  : infoWindowData.venue}
              </h3>
              <p>Chosen by: {infoWindowData.chosenby}</p>
              <p>Date: {getFormattedDate(infoWindowData.date)}</p>
            </InfoWindow>
          )}
        </LocationMap>
      </Box>
    </APIProvider>
  );
};

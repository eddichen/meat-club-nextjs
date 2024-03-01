import { useMap } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";

export const EventsMapBounds = ({ events }: { events: MeatClubEvent[] }) => {
  const [bounds, setBounds] = useState({
    north: 51.5079629,
    south: 51.5079629,
    east: -0.1424906,
    west: -0.1424906,
  });
  const map = useMap();

  useEffect(() => {
    const calculateBounds = (events: MeatClubEvent[]) => {
      events.map((event) => {
        if (event.lat > bounds.north) {
          setBounds({ ...bounds, north: event.lat });
        } else if (event.lat < bounds.south) {
          setBounds({ ...bounds, south: event.lat });
        }

        if (event.lng > bounds.east) {
          setBounds({ ...bounds, east: event.lng });
        } else if (event.lng < bounds.west) {
          setBounds({ ...bounds, west: event.lng });
        }
      });
    };
    calculateBounds(events);
    map?.fitBounds({
      east: bounds.east,
      north: bounds.north,
      south: bounds.south,
      west: bounds.west,
    });
  }, [map, bounds, events]);

  return null;
};

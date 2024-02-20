"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AdvancedMarker,
  Map,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { Autocomplete, TextField, Box } from "@mui/material";
import { debounce } from "@mui/material/utils";
import { HandleFormProps } from "./add-event-form";

const getOptions = (
  venues: google.maps.places.PlaceResult[] | null,
): (string | undefined)[] => {
  if (!venues) return [];
  return venues.map((venue) => venue.name);
};

export default function VenueField({
  handleVenue,
}: {
  handleVenue: ({ name, venue }: HandleFormProps) => void;
}) {
  const [placesService, setPlacesService] =
    useState<google.maps.places.PlacesService | null>(null);
  const [venueOptions, setVenueOptions] = useState<
    google.maps.places.PlaceResult[] | null
  >(null);
  const [searchValue, setSearchValue] = useState("");

  const getPlaces = useMemo(
    () =>
      debounce(
        (
          placesService: google.maps.places.PlacesService,
          searchValue: string,
        ) => {
          placesService.nearbySearch(
            {
              bounds: new google.maps.LatLngBounds(
                { lat: 51.3446573, lng: -0.491017 },
                { lat: 51.694998, lng: 0.2361655 },
              ),
              keyword: searchValue,
            },
            (results, status) => {
              if (status === google.maps.places.PlacesServiceStatus.OK) {
                setVenueOptions(results);
              }
            },
          );
        },
        400,
      ),
    [],
  );

  const map = useMap();
  const placesLibrary = useMapsLibrary("places");

  useEffect(() => {
    if (!placesLibrary || !map) return undefined;

    setPlacesService(new placesLibrary.PlacesService(map));
  }, [placesLibrary, map]);

  useEffect(() => {
    if (!placesService) return;

    if (!searchValue) {
      setVenueOptions([]);
      return;
    }

    getPlaces(placesService, searchValue);
    if (venueOptions && venueOptions.length > 0) {
      handleVenue({
        name: "venue",
        venue: venueOptions?.find((venue) => venue.name === searchValue),
      });
    }
  }, [getPlaces, placesService, searchValue, handleVenue, venueOptions]);

  return (
    <>
      <Box sx={{ height: "50vh", mb: 2 }}>
        <Map
          mapId="61baed150fa492b8"
          defaultCenter={{ lat: 51.5285262, lng: -0.2664021 }}
          defaultZoom={11}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
        >
          {venueOptions &&
            venueOptions.map((venue) => (
              <AdvancedMarker
                key={venue.place_id}
                position={{
                  lat: venue.geometry?.location?.lat() || 0,
                  lng: venue.geometry?.location?.lng() || 0,
                }}
                title={venue.name}
              />
            ))}
        </Map>
      </Box>
      <Autocomplete
        options={getOptions(venueOptions)}
        freeSolo
        filterOptions={(x) => x}
        filterSelectedOptions
        onInputChange={(event, inputValue) => setSearchValue(inputValue)}
        renderInput={(params) => (
          <TextField {...params} label="Add a venue" name="venue" fullWidth />
        )}
        noOptionsText="No venues found"
        value={searchValue}
      />
    </>
  );
}

"use client";

import { useCallback, useEffect, useState } from "react";
import {
  AdvancedMarker,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { Autocomplete, TextField, Box } from "@mui/material";
import MapHandler from "./map-handler";
import { LocationMap } from "./location-map";

interface VenueFieldProps {
  handleVenue: ({ name, lat, lng }: Venue) => void;
  resetField: boolean;
  unsetResetField: () => void;
}

const getOptions = (
  results: google.maps.places.AutocompletePrediction[] | null,
): (string | undefined)[] => {
  if (!results) return [];
  return results.map((result) => result.description);
};

export default function VenueField({
  handleVenue,
  resetField,
  unsetResetField,
}: VenueFieldProps) {
  const map = useMap();
  const placesLibrary = useMapsLibrary("places");

  const [placesService, setPlacesService] =
    useState<google.maps.places.PlacesService | null>(null);
  const [sessionToken, setSessionToken] =
    useState<google.maps.places.AutocompleteSessionToken>();
  const [autocompleteService, setAutocompleteService] =
    useState<google.maps.places.AutocompleteService | null>(null);
  const [predictionResults, setPredictionResults] = useState<
    Array<google.maps.places.AutocompletePrediction>
  >([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);
  const [fetchingData, setFetchingData] = useState<boolean>(false);

  useEffect(() => {
    if (resetField) setSearchValue("");
    unsetResetField();
  }, [resetField, unsetResetField]);

  useEffect(() => {
    if (!placesLibrary || !map) return;

    setAutocompleteService(new placesLibrary.AutocompleteService());
    setPlacesService(new placesLibrary.PlacesService(map));
    setSessionToken(new placesLibrary.AutocompleteSessionToken());

    return () => setAutocompleteService(null);
  }, [placesLibrary, map]);

  const fetchPredictions = useCallback(
    async (inputValue: string) => {
      if (!autocompleteService || !inputValue) {
        setPredictionResults([]);
        return;
      }

      const request = {
        input: inputValue,
        sessionToken,
        componentRestrictions: { country: "gb" },
        fields: ["name", "geometry"],
      };
      const response = await autocompleteService.getPlacePredictions(request);

      setPredictionResults(response.predictions);
    },
    [autocompleteService, sessionToken],
  );

  const onInputChange = useCallback(
    (value: string) => {
      setSearchValue(value);
      fetchPredictions(value);
    },
    [fetchPredictions],
  );

  const onSelect = useCallback(
    (value: string) => {
      if (!placesLibrary || !value) return;

      const prediction = predictionResults.find(
        (result) => result.description === value,
      );

      if (!prediction) return;

      setFetchingData(true);

      const detailRequestOptions = {
        placeId: prediction.place_id,
        fields: ["geometry", "name"],
        sessionToken,
      };

      const detailsRequestCallback = (
        placeDetails: google.maps.places.PlaceResult | null,
      ) => {
        setSelectedPlace(placeDetails);
        setSearchValue(placeDetails?.name ?? "");
        setSessionToken(new placesLibrary.AutocompleteSessionToken());

        setFetchingData(false);

        handleVenue({
          name: placeDetails?.name,
          lat: placeDetails?.geometry?.location?.lat(),
          lng: placeDetails?.geometry?.location?.lng(),
        });
      };

      placesService?.getDetails(detailRequestOptions, detailsRequestCallback);
    },
    [
      setSelectedPlace,
      placesLibrary,
      placesService,
      sessionToken,
      predictionResults,
      handleVenue,
    ],
  );

  return (
    <>
      <Box sx={{ height: "360px", mb: 2 }}>
        <LocationMap>
          {selectedPlace && (
            <AdvancedMarker
              key={selectedPlace.place_id}
              position={{
                lat: selectedPlace.geometry?.location?.lat() || 0,
                lng: selectedPlace.geometry?.location?.lng() || 0,
              }}
              title={selectedPlace.name}
            />
          )}
          <MapHandler place={selectedPlace} />
        </LocationMap>
      </Box>
      <Autocomplete
        options={getOptions(predictionResults)}
        freeSolo
        filterOptions={(x) => x}
        filterSelectedOptions
        onInputChange={(event: React.SyntheticEvent<Element, Event>, value) =>
          onInputChange(value)
        }
        onChange={(event, value) => onSelect(value as string)}
        renderInput={(params) => (
          <TextField {...params} label="Add a venue" name="venue" fullWidth />
        )}
        noOptionsText="No venues found"
        value={searchValue}
      />
    </>
  );
}

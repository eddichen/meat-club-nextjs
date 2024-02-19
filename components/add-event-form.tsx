"use client";

import { useEffect, useState } from "react";
import { Map, useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import {
  Container,
  Autocomplete,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
  Box,
  Grid,
} from "@mui/material";
import { debounce } from "@mui/material/utils";

const getOptions = (
  venues: google.maps.places.PlaceResult[] | null,
): (string | undefined)[] => {
  if (!venues) return [];
  return venues.map((venue) => venue.name);
};

export default function AddEventForm() {
  const [placesService, setPlacesService] =
    useState<google.maps.places.PlacesService | null>(null);
  const [venueOptions, setVenueOptions] = useState<
    google.maps.places.PlaceResult[] | null
  >(null);
  const [searchValue, setSearchValue] = useState("");

  const map = useMap();
  const placesLibrary = useMapsLibrary("places");

  useEffect(() => {
    if (!placesLibrary || !map) return;

    setPlacesService(new placesLibrary.PlacesService(map));
  }, [placesLibrary, map]);

  useEffect(() => {
    if (!placesService || !searchValue) return undefined;
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
  }, [placesService, searchValue]);

  return (
    <Container maxWidth="xs">
      <Box sx={{ height: "50vh", mb: 2 }}>
        <Map
          defaultCenter={{ lat: 51.5285262, lng: -0.2664021 }}
          defaultZoom={11}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
        />
      </Box>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Autocomplete
            options={getOptions(venueOptions)}
            filterOptions={(x) => x}
            filterSelectedOptions
            onInputChange={(event, newInputValue) =>
              setSearchValue(newInputValue)
            }
            renderInput={(params) => (
              <TextField {...params} label="Add a venue" fullWidth />
            )}
            noOptionsText="No venues found"
            value={searchValue}
          />
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
          <FormControl fullWidth>
            <InputLabel id="chosen-by">Chosen by</InputLabel>
            <Select
              required
              label="Chosen by"
              labelId="chosen-by"
              value="Chris"
              fullWidth
            >
              <MenuItem value="Chris">Chris</MenuItem>
              <MenuItem value="Eddi">Eddi</MenuItem>
              <MenuItem value="Gareth">Gareth</MenuItem>
              <MenuItem value="James">James</MenuItem>
              <MenuItem value="Pete">Pete</MenuItem>
              <MenuItem value="Taylor">Taylor</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <Button variant="contained" size="large" fullWidth>
            Add Event
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

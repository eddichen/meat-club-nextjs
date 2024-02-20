type Users = {
  id: number;
  name: string;
};

interface Venue {
  name: string | undefined;
  lat: number | undefined;
  lng: number | undefined;
}

interface VenueWithResidency extends Venue {
  residency: string | null;
}

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
  residency?: string | null;
}

interface Location {
  id: number;
  venue: string;
  lat: number;
  lng: number;
  createdAt: string;
}

interface EventsFormData {
  venue: Venue;
  date: string;
  eventNumber: number;
  chosenBy: number;
  residency?: string;
}

interface EventData {
  eventNumber: number;
  date: string;
  venueId: number;
  chosenBy: number;
  residency?: string;
}

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

interface Location {
  id: number;
  venue: string;
  lat: number;
  lng: number;
  createdAt: string;
}

interface EventsFormData {
  eventNumber: number;
  date: string;
  residency: string | null;
  venue: Venue;
  chosenBy: number;
}

interface EventData {
  eventNumber: number;
  date: string;
  venueId: number;
  chosenBy: number;
}

interface Event {
  eventnumber: number;
  date: string;
  residency: string | null;
  venue: string;
  lat: number;
  lng: number;
  chosenby: number;
}

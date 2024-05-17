type Users = {
  id: number;
  name: string;
  email: string;
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

type EventData = {
  eventnumber: string;
  date: string;
  venueId: number;
  chosenby: string;
};

type MeatClubEvent = Omit<EventData, "venueId"> &
  Pick<Location, "venue" | "lat" | "lng"> & {
    residency: string | null;
  };

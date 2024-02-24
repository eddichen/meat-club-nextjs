import { getUsers } from "@/lib/users";
import { getSingleLocation, setLocation } from "@/lib/locations";
import { addEvent } from "@/lib/events";
import AddEventForm from "@/components/add-event-form";

export default function AddEvent() {
  const getUserOptions = async () => {
    "use server";

    const userData = await getUsers();
    const { rows: users } = userData;
    return users;
  };

  const addLocation = async (eventData: EventsFormData) => {
    "use server";

    const { venue, residency = null, eventNumber, date, chosenBy } = eventData;

    try {
      await setLocation({
        residency,
        name: venue.name,
        lat: venue.lat,
        lng: venue.lng,
      });
    } catch (e) {
      throw new Error("There has been an error setting the location");
    }

    let venueId: number;

    try {
      const venueData = await getSingleLocation(venue.name);
      venueId = venueData && venueData.rows[0].id;
    } catch (e) {
      throw new Error("There has been an error fetching the location");
    }

    try {
      await addEvent({ eventNumber, date, venueId, chosenBy });
    } catch (e) {
      throw new Error("There has been an error saving the event");
    }
  };

  return (
    <AddEventForm getUserOptions={getUserOptions} addLocation={addLocation} />
  );
}

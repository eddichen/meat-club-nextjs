import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

import { getUsers } from "@/lib/users";
import { getSingleLocation, setLocation } from "@/lib/locations";
import { addEvent } from "@/lib/events";
import AddEventForm from "@/components/add-event-form";

export default async function AddEvent() {
  const session = await auth();

  if (!session) redirect("/api/auth/signin");

  const getUserOptions = async () => {
    "use server";

    const userData = await getUsers();
    const { rows: users } = userData;
    return users;
  };

  const addLocation = async (venueData: Venue, eventData: FormData) => {
    "use server";

    const rawFormData = {
      residency: eventData.get("residency"),
      eventnumber: eventData.get("eventNumber"),
      date: eventData.get("date"),
      chosenBy: eventData.get("chosenBy"),
    };

    const { residency, eventnumber, date, chosenBy } = rawFormData;

    try {
      if (!venueData) throw new Error();
      await setLocation({
        residency: residency as string,
        name: venueData.name,
        lat: venueData.lat,
        lng: venueData.lng,
      });
    } catch (e) {
      throw new Error("There has been an error setting the location");
    }

    let venueId: number;

    try {
      const singleVenue = await getSingleLocation(venueData.name);
      venueId = singleVenue && singleVenue.rows[0].id;
    } catch (e) {
      throw new Error("There has been an error fetching the location");
    }

    try {
      await addEvent({
        eventnumber: eventnumber as string,
        date: date as string,
        venueId,
        chosenby: chosenBy as string,
      });
      revalidatePath("/events");
      return;
    } catch (e) {
      throw new Error("There has been an error saving the event");
    }
  };

  return (
    <>
      {session && (
        <AddEventForm
          getUserOptions={getUserOptions}
          addLocation={addLocation}
        />
      )}
    </>
  );
}

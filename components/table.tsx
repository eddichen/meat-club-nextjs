import { timeAgo } from "@/lib/utils";
import RefreshButton from "./refresh-button";
import { getUsers } from "@/lib/users";
import { getLocations } from "@/lib/locations";
import { getEvents } from "@/lib/events";

export default async function Table() {
  const usersData = await getUsers();
  const locationsData = await getLocations();
  const eventsData = await getEvents();

  const { rows: users } = usersData;
  const { rows: locations } = locationsData;
  const { rows: events } = eventsData;

  return (
    <>
      <div className="bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full">
        <div className="flex justify-between items-center mb-4">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold">Recent Users</h2>
          </div>
          <RefreshButton />
        </div>
        <div className="divide-y divide-gray-900/5">
          {users.map((user) => (
            <div
              key={user.name}
              className="flex items-center justify-between py-3"
            >
              <div className="flex items-center space-x-4">
                <div className="space-y-1">
                  <p className="font-medium leading-none">{user.id}</p>
                  <p className="font-medium leading-none">{user.name}</p>
                </div>
              </div>
              <p className="text-sm text-gray-500">{timeAgo(user.createdAt)}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full">
        <div className="flex justify-between items-center mb-4">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold">Locations</h2>
          </div>
          <RefreshButton />
        </div>
        <div className="divide-y divide-gray-900/5">
          {locations.map((location) => (
            <div
              key={location.name}
              className="flex items-center justify-between py-3"
            >
              <div className="flex items-center space-x-4">
                <div className="space-y-1">
                  <p className="font-medium leading-none">{location.id}</p>
                  <p className="font-medium leading-none">{location.name}</p>
                  <p className="font-medium leading-none">{location.venue}</p>
                  <p className="font-medium leading-none">{location.address}</p>
                </div>
              </div>
              <p className="text-sm text-gray-500">
                {timeAgo(location.createdAt)}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full">
        <div className="flex justify-between items-center mb-4">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold">Events</h2>
          </div>
          <RefreshButton />
        </div>
        <div className="divide-y divide-gray-900/5">
          {events.map((event) => (
            <div
              key={event.name}
              className="flex items-center justify-between py-3"
            >
              <div className="flex items-center space-x-4">
                <div className="space-y-1">
                  <p className="font-medium leading-none">
                    {event.eventnumber}
                  </p>
                  <p className="font-medium leading-none">{event.date}</p>
                  <p className="font-medium leading-none">{event.residency}</p>
                  <p className="font-medium leading-none">{event.venue}</p>
                  <p className="font-medium leading-none">{event.address}</p>
                  <p className="font-medium leading-none">{event.chosenby}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

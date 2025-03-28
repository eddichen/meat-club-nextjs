import { CardContent, Typography } from "@mui/material";

interface NextEventProps {
  users: Users[];
  events: EventData[];
}

export function NextEvent({ users, events }: NextEventProps) {
  const activeUsers = users.filter((user) => user.is_active);
  const orderedUsers = activeUsers.sort((a, b) => a.order - b.order);
  const lastEventChosenBy = users.find(
    (user) => user.name === events[0].chosenby,
  );
  const lastEventUserIndex =
    (lastEventChosenBy && orderedUsers.indexOf(lastEventChosenBy)) || 0;
  const nextEventUserIndex =
    (lastEventUserIndex + 1) % orderedUsers.length || 0;

  return (
    <>
      <CardContent
        sx={{ textAlign: "center", backgroundColor: "#000", color: "#fff" }}
      >
        <Typography>Next Meat Club</Typography>
        <Typography variant="h2">{`${events[0].eventnumber + 1}`}</Typography>
        <Typography>to be chosen by</Typography>
        <Typography variant="h4">
          {orderedUsers[nextEventUserIndex].name}
        </Typography>
      </CardContent>
    </>
  );
}

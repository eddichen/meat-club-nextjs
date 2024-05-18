"use client";

import { Avatar, Box, List, ListItem, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

interface EventByUserProps {
  users: Users[];
  events: EventData[];
}

const stringToColor = (string: string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
};

const stringAvatar = (name: string) => {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name[0]}`,
  };
};

export const EventsByUser = ({ users, events }: EventByUserProps) => {
  const leaderBoard = users
    .map((user) => {
      const eventsByUser = events.filter(
        (event) => event.chosenby === user.name,
      );
      return {
        name: user.name,
        events: eventsByUser.length,
      };
    })
    .sort((a, b) => b.events - a.events);

  const podium = leaderBoard.slice(0, 3);
  const restOfTheField = leaderBoard.slice(3);

  return (
    <>
      <Box sx={{ py: 3, backgroundColor: "#f1f1f1" }}>
        <Grid container sx={{ flexGrow: 1, height: "150px" }}>
          <Grid xs={4} alignContent="end">
            <Stack alignItems="center">
              <Avatar sx={{ width: "60px", height: "60px" }}>
                {podium[1].name.slice(0, 1)}
              </Avatar>
              <Typography>{podium[1].name}</Typography>
              <Typography sx={{ fontSize: "1.5rem" }}>
                {podium[1].events}
              </Typography>
            </Stack>
          </Grid>
          <Grid xs={4} alignContent="top">
            <Stack alignItems="center">
              <Avatar sx={{ width: "70px", height: "70px" }}>
                {podium[0].name.slice(0, 1)}
              </Avatar>
              <Typography>{podium[0].name}</Typography>
              <Typography sx={{ fontSize: "2rem" }}>
                {podium[0].events}
              </Typography>
            </Stack>
          </Grid>
          <Grid xs={4} alignContent="end">
            <Stack alignItems="center">
              <Avatar sx={{ width: "50px", height: "50px" }}>
                {podium[2].name.slice(0, 1)}
              </Avatar>
              <Typography>{podium[2].name}</Typography>
              <Typography sx={{ fontSize: "1.5rem" }}>
                {podium[2].events}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Box>
      <List sx={{ px: 1 }}>
        {restOfTheField.map((user, i) => (
          <ListItem key={user.name}>
            <Grid
              container
              spacing={2}
              alignItems="center"
              sx={{ flexGrow: 1 }}
            >
              <Grid xs={1.2}>
                <Typography sx={{ fontWeight: "bold" }}>{i + 4}</Typography>
              </Grid>
              <Grid xs>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar {...stringAvatar(user.name)} />
                  <Typography>{user.name}</Typography>
                </Stack>
              </Grid>
              <Grid xs={3}>
                <Stack
                  direction="row"
                  alignItems="baseline"
                  spacing={0.5}
                  justifyContent="flex-end"
                >
                  <Typography sx={{ fontSize: "1.5rem", textAlign: "right" }}>
                    {user.events}
                  </Typography>
                  <Typography sx={{ fontsize: "0.8rem" }}>events</Typography>
                </Stack>
              </Grid>
            </Grid>
          </ListItem>
        ))}
      </List>
    </>
  );
};

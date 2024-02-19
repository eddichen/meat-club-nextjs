"use client";

import { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function ChosenByField({ users }: { users: Users[] }) {
  const [chosenByValue, setChosenByValue] = useState("");

  return (
    <FormControl fullWidth>
      <InputLabel id="chosen-by">Chosen by</InputLabel>
      <Select
        required
        label="Chosen by"
        onChange={(e) => setChosenByValue(e.target.value)}
        value={chosenByValue}
        labelId="chosen-by"
        fullWidth
      >
        {users.map((user) => (
          <MenuItem key={user.id} value={user.id}>
            {user.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

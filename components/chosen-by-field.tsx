"use client";

import { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

type ChosenByFieldProps = {
  users: Users[];
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function ChosenByField({
  users,
  handleChange,
}: ChosenByFieldProps) {
  const [chosenByValue, setChosenByValue] = useState("");

  const handleUserChange = (event: any) => {
    setChosenByValue(event.target.value);
    handleChange(event);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="chosen-by">Chosen by</InputLabel>
      <Select
        required
        label="Chosen by"
        onChange={handleUserChange}
        value={chosenByValue}
        labelId="chosen-by"
        fullWidth
        name="chosenBy"
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

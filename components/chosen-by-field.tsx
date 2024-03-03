"use client";

import { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { QueryResultRow } from "@vercel/postgres";

type ChosenByFieldProps = {
  getUserOptions: () => Promise<QueryResultRow[]>;
};

export default function ChosenByField({ getUserOptions }: ChosenByFieldProps) {
  const [chosenByValue, setChosenByValue] = useState("");
  const [users, setUsers] = useState<Users[]>([]);

  const handleUserChange = (event: any) => {
    setChosenByValue(event.target.value);
  };

  useEffect(() => {
    const getUsers = async () => {
      const users = await getUserOptions();
      setUsers(users as Users[]);
    };

    getUsers();
  }, [getUserOptions]);

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

import { TableCell, TableRow } from "@mui/material";

export default function EventsItem({ events }: { events: Event[] }) {
  return (
    <>
      {events.map((event, i) => (
        <TableRow key={i}>
          <TableCell>{event.eventnumber}</TableCell>
          <TableCell>{event.date}</TableCell>
          <TableCell>{event.residency}</TableCell>
          <TableCell>{event.venue}</TableCell>
          <TableCell>{event.chosenby}</TableCell>
        </TableRow>
      ))}
    </>
  );
}

import { TableCell, TableRow } from "@mui/material";
import { getFormattedDate } from "@/utils/date";

export default function EventsItem({ events }: { events: MeatClubEvent[] }) {
  return (
    <>
      {events.map((event, i) => (
        <TableRow key={i}>
          <TableCell>{event.eventnumber}</TableCell>
          <TableCell data-testid="event-date">
            {getFormattedDate(event.date)}
          </TableCell>
          <TableCell>{event.residency}</TableCell>
          <TableCell>{event.venue}</TableCell>
          <TableCell>{event.chosenby}</TableCell>
        </TableRow>
      ))}
    </>
  );
}

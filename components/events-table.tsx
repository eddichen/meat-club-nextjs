import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export default function EventsTable({ children }: React.PropsWithChildren) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Meat Club No.</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Venue</TableCell>
            <TableCell>Chosen by</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{children}</TableBody>
      </Table>
    </TableContainer>
  );
}

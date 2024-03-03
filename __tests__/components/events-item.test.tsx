import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import EventsItem from "@/components/events-item";

const event: MeatClubEvent[] = [
  {
    eventnumber: 1,
    date: "2011-06-01",
    residency: null,
    venue: "Hawksmoor Spitalfields",
    lat: 0,
    lng: 0,
    chosenby: 1,
  },
];

describe("EventsItem", () => {
  test("it renders the formatted date", () => {
    render(
      <table>
        <tbody>
          <EventsItem events={event} />
        </tbody>
      </table>,
    );
    expect(screen.getByTestId("event-date")).toHaveTextContent(
      "Wednesday, 1 June 2011",
    );
  });
});

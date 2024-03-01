import { describe, expect, test } from "@jest/globals";
import { getFormattedDate } from "@/utils/date";

describe("date helpers", () => {
  test("it should convert a date string to a formatted date", () => {
    const dateString = "2011-06-01";
    expect(getFormattedDate(dateString)).toBe("Wednesday, 1 June 2011");
  });
});

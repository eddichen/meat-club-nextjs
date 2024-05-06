"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

interface EventsPerYearProps {
  events: EventData[];
}

interface EventsPerYear {
  year: string;
  events: string;
}

interface Years {
  [key: string]: string;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Number of Meatclubs Per Year",
    },
  },
  indexAxis: "y",
};

export const EventsPerYear = ({ events }: EventsPerYearProps) => {
  let eventsPerYear: EventsPerYear[] = [];
  let years: Years = {};

  for (let event of events) {
    const eventYear = new Date(event.date).getFullYear();
    if (years[eventYear]) {
      years[eventYear] += 1;
    } else {
      years = { ...years, [eventYear]: 1 };
    }
  }

  for (const [key, value] of Object.entries(years)) {
    eventsPerYear = eventsPerYear
      .concat([{ year: key, events: value }])
      .sort((a, b) => parseInt(b.year) - parseInt(a.year));
  }

  const data = {
    labels: eventsPerYear.map((eventsYear) => eventsYear.year),
    datasets: [
      {
        label: "Events per year",
        data: eventsPerYear.map((eventsYear) => eventsYear.events),
        backgroundColor: ["rgba(255, 99, 132, 0.2)"],
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

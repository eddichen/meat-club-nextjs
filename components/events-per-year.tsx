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

ChartJS.defaults.font.size = 16;

const options = {
  aspectRatio: 0.7,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  indexAxis: "y" as const,
  layout: {
    padding: 10,
  },
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
        backgroundColor: ["#FF584D"],
        barPercentage: 1,
        categoryPercentage: 1,
        data: eventsPerYear.map((eventsYear) => eventsYear.events),
        label: "Events per year",
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

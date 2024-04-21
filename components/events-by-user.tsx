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

interface EventByUserProps {
  users: Users[];
  events: EventData[];
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
      text: "Chart.js Bar Chart",
    },
  },
};

export const EventsByUser = ({ users, events }: EventByUserProps) => {
  const userEvents = users.map((user) => {
    const eventsByUser = events.filter((event) => event.chosenby === user.name);
    return {
      name: user.name,
      events: eventsByUser.length,
    };
  });

  const data = {
    labels: userEvents.map((user) => user.name),
    datasets: [
      {
        label: "Events chosen by user",
        data: userEvents.map((event) => event.events),
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

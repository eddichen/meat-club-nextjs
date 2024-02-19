"use client";
import AddEventForm from "@/components/add-event-form";
import { APIProvider } from "@vis.gl/react-google-maps";

export default function AddEvent() {
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "";

  return (
    <APIProvider apiKey={API_KEY}>
      <AddEventForm />
    </APIProvider>
  );
}

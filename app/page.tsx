import { Suspense } from "react";
import Table from "@/components/table";

export const runtime = "edge";
export const preferredRegion = "home";
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main>
      <Suspense fallback="loading...">
        <Table />
      </Suspense>
    </main>
  );
}

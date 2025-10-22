"use client";

import dynamic from "next/dynamic";

// dynamic import, khusus client-side
const ReadonlyMap = dynamic(() => import("./readonly-map"), { ssr: false });

export default function ReadonlyMapWrapper({ lat, lng }: { lat: number; lng: number }) {
  return <ReadonlyMap lat={lat} lng={lng} />;
}
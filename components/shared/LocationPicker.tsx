"use client";

import { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L, { LatLng, LeafletMouseEvent } from "leaflet";
import "leaflet/dist/leaflet.css";

type Props = {
  onLocationSelect: (lat: number, lng: number, address?: string) => void;
  initialCenter?: { lat: number; lng: number };
  initialZoom?: number;
};

type SearchResult = {
  display_name: string;
  lat: string;
  lon: string;
  place_id: number | string;
};

const markerIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  shadowSize: [41, 41],
});

function ClickMarker({
  position,
  setPosition,
  onPick,
}: {
  position: LatLng | null;
  setPosition: (p: LatLng) => void;
  onPick: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click(e: LeafletMouseEvent) {
      const p = e.latlng;
      setPosition(p);
      onPick(p.lat, p.lng);
    },
  });

  return position ? <Marker position={position} icon={markerIcon} /> : null;
}

function MapController({ position, zoom = 15 }: { position: LatLng | null; zoom?: number }) {
  const map = useMap();
  useEffect(() => {
    if (position) map.setView(position, zoom, { animate: true });
  }, [position, zoom, map]);
  return null;
}

/** Komponen kecil untuk memastikan leaflet resize dengan benar */
function MapAutoResize() {
  const map = useMap();
  useEffect(() => {
    // invalidate setelah mount
    setTimeout(() => map.invalidateSize(), 0);

    // invalidate saat window resize
    const ro = new ResizeObserver(() => map.invalidateSize());
    ro.observe(map.getContainer());
    return () => ro.disconnect();
  }, [map]);
  return null;
}

export default function LocationPicker({
  onLocationSelect,
  initialCenter = { lat: -6.2, lng: 106.8 },
  initialZoom = 13,
}: Props) {
  const [position, setPosition] = useState<LatLng | null>(null);

  // search state
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const search = async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}&limit=8&countrycodes=id&addressdetails=1`,
        {
          headers: {
            "User-Agent": "facility-location-picker/1.0",
            "Accept-Language": "id,en;q=0.8",
          },
        }
      );
      const data = (await res.json()) as SearchResult[];
      setResults(Array.isArray(data) ? data : []);
      setOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const onQueryChange = (val: string) => {
    setQ(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => search(val), 500);
  };

  const pickResult = (r: SearchResult) => {
    const lat = parseFloat(r.lat);
    const lng = parseFloat(r.lon);
    const p = new L.LatLng(lat, lng);
    setPosition(p);
    onLocationSelect(lat, lng, r.display_name);
    setQ(r.display_name);
    setOpen(false);
  };

  return (
    <div className="relative">
      {/* Search di atas map */}
      <div className="mb-3 relative">
        <input
          value={q}
          onChange={(e) => onQueryChange(e.target.value)}
          onFocus={() => results.length > 0 && setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 160)}
          placeholder="Cari lokasi… (contoh: Bandung, Jakarta)"
          className="w-full rounded-lg border border-emerald-300 bg-white/95 px-4 py-2 pr-9 text-sm shadow-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
        />
        <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
          {loading ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-emerald-500 border-top-transparent" />
          ) : (
            <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          )}
        </div>

        {open && results.length > 0 && (
          <div className="absolute z-999 mt-1 max-h-64 w-full overflow-auto rounded-md border border-emerald-200 bg-white shadow-lg">
            {results.map((r) => (
              <button
                key={r.place_id}
                type="button"
                onClick={() => pickResult(r)}
                className="w-full truncate px-3 py-2 text-left text-sm hover:bg-emerald-50"
              >
                {r.display_name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* WRAPPER HARUS PUNYA TINGGI */}
      <div className="h-[260px] w-full overflow-hidden rounded-lg ring-1 ring-emerald-100">
        <MapContainer
          center={[initialCenter.lat, initialCenter.lng]}
          zoom={initialZoom}
          className="h-full w-full"     // penting
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='© OpenStreetMap'
          />
          <MapAutoResize />
          <ClickMarker
            position={position}
            setPosition={(p) => setPosition(p)}
            onPick={(lat, lng) => onLocationSelect(lat, lng)}
          />
          <MapController position={position} />
        </MapContainer>
      </div>
    </div>
  );
}

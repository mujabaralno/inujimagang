import { notFound } from "next/navigation";
import { getFacilityById } from "@/actions/facility.actions";
import { Badge } from "@/components/ui/badge";
import ReadonlyMapWrapper from "@/components/shared/ReadonlyMapWrapper";
import {
  Users,
  Phone,
  AtSign,
  MapPin,
  Package,
  Info,
} from "lucide-react";

type Props = { params: { id: string } };

export default async function FacilityDetailPage({ params }: Props) {
  const facility = await getFacilityById(params.id);
  if (!facility) return notFound();

  return (
    <div className="wrapper space-y-8">
      {/* Hero */}
      <div className="relative h-72 w-full overflow-hidden rounded-2xl shadow">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={facility.photoUrl}
          alt={facility.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex items-end p-6">
          <div>
            <h1 className="text-2xl font-bold text-white">{facility.name}</h1>
            <div className="mt-2 flex items-center gap-3">
              <Badge
                variant="outline"
                className={`${
                  facility.status === "DIPINJAMKAN"
                    ? "border-green-400 text-green-200"
                    : "border-amber-400 text-amber-200"
                }`}
              >
                {facility.status}
              </Badge>
              <div className="flex items-center gap-1 text-sm text-white/90">
                <Users className="h-4 w-4" />
                {facility.capacity} orang
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid info */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          {/* Deskripsi */}
          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold">
              <Info className="h-5 w-5 text-indigo-600" />
              Deskripsi
            </h2>
            <p className="text-slate-700 leading-relaxed">
              {facility.description || "Belum ada deskripsi."}
            </p>
          </div>

          {/* Fasilitas */}
          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold">
              <Package className="h-5 w-5 text-orange-600" />
              Fasilitas
            </h2>
            {facility.facilities?.length ? (
              <ul className="list-disc pl-6 text-slate-700 space-y-1">
                {facility.facilities.map((f: string, i: number) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-500">Tidak ada fasilitas tercatat.</p>
            )}
          </div>

          {/* Kontak */}
          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold">
              <Phone className="h-5 w-5 text-teal-600" />
              Kontak
            </h2>
            <div className="space-y-2 text-slate-700">
              {facility.picName && (
                <p>
                  <span className="font-medium">PIC: </span>
                  {facility.picName}
                </p>
              )}
              {facility.contact?.phone && (
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-slate-500" />
                  {facility.contact.phone}
                </p>
              )}
              {facility.contact?.email && (
                <p className="flex items-center gap-2">
                  <AtSign className="h-4 w-4 text-slate-500" />
                  {facility.contact.email}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Lokasi */}
        <div className="space-y-4">
          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold">
              <MapPin className="h-5 w-5 text-green-600" />
              Lokasi
            </h2>
            {facility.location ? (
              <div className="h-64 overflow-hidden rounded-lg">
                <ReadonlyMapWrapper
                  lat={facility.location.lat}
                  lng={facility.location.lng}
                />
              </div>
            ) : (
              <p className="text-slate-500">Lokasi belum diatur.</p>
            )}
            {facility.addressText && (
              <p className="mt-3 text-sm text-slate-600">
                {facility.addressText}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

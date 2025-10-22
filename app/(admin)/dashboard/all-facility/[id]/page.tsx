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
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type Props = { params: { id: string } };

export default async function FacilityDetailPage({ params }: Props) {
  const facility = await getFacilityById(params.id);
  if (!facility) return notFound();

  const isAvailable = facility.status === "DIPINJAMKAN";

  return (
    <main className="min-h-screen space-y-10 px-4 py-10 bg-linear-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl shadow-md">
        <Image
          src={`${facility.photoUrl} | "/next.svg" `}
          alt={facility.name}
          width={100}
          height={100}
          className="h-72 w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent flex items-end p-8">
          <div className="space-y-3">
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              {facility.name}
            </h1>
            <div className="flex items-center flex-wrap gap-3">
              <Badge
                variant="outline"
                className={`px-3 py-1.5 rounded-full text-sm font-semibold backdrop-blur-md ${
                  isAvailable
                    ? "border-emerald-400 text-emerald-200 bg-emerald-800/20"
                    : "border-amber-400 text-amber-100 bg-amber-800/20"
                }`}
              >
                {facility.status === "DIPINJAMKAN" ? "Dipinjamkan" : "Disewakan"}
              </Badge>
              <div className="flex items-center gap-2 text-sm text-white/90 font-medium">
                <Users className="h-4 w-4" />
                {facility.capacity} orang
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Information Grid */}
      <section className="grid gap-8 md:grid-cols-3">
        {/* Left Column - Facility Details */}
        <div className="md:col-span-2 space-y-6">
          {/* Description */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg transition-all">
            <div className="flex items-center gap-2 mb-3">
              <Info className="h-5 w-5 text-indigo-600" />
              <h2 className="text-xl font-semibold text-slate-900">
                Deskripsi
              </h2>
            </div>
            <p className="text-slate-700 leading-relaxed">
              {facility.description || "Belum ada deskripsi tersedia."}
            </p>
          </div>

          {/* Available Features */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg transition-all">
            <div className="flex items-center gap-2 mb-3">
              <Package className="h-5 w-5 text-orange-500" />
              <h2 className="text-xl font-semibold text-slate-900">
                Fasilitas Pendukung
              </h2>
            </div>
            {facility.facilities?.length ? (
              <ul className="list-disc pl-5 text-slate-700 space-y-1">
                {facility.facilities.map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-500 text-sm">
                Tidak ada fasilitas tambahan yang tercatat.
              </p>
            )}
          </div>

          {/* PIC Contact Info */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg transition-all">
            <div className="flex items-center gap-2 mb-3">
              <Phone className="h-5 w-5 text-teal-600" />
              <h2 className="text-xl font-semibold text-slate-900">
                Kontak Person
              </h2>
            </div>
            <div className="space-y-3 text-slate-700">
              {facility.picName && (
                <p className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-slate-500" />
                  <span>{facility.picName}</span>
                </p>
              )}
              {facility.contact?.phone && (
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-slate-500" />
                  <a
                    href={`tel:${facility.contact.phone}`}
                    className="hover:text-indigo-600"
                  >
                    {facility.contact.phone}
                  </a>
                </p>
              )}
              {facility.contact?.email && (
                <p className="flex items-center gap-2">
                  <AtSign className="h-4 w-4 text-slate-500" />
                  <a
                    href={`mailto:${facility.contact.email}`}
                    className="hover:text-indigo-600"
                  >
                    {facility.contact.email}
                  </a>
                </p>
              )}
              {!facility.contact && (
                <p className="text-slate-500 text-sm">
                  Tidak ada informasi kontak tersedia.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Map & Location */}
        <aside className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg transition-all">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="h-5 w-5 text-green-600" />
              <h2 className="text-xl font-semibold text-slate-900">Lokasi</h2>
            </div>

            {facility.location ? (
              <div className="h-64 overflow-hidden rounded-xl">
                <ReadonlyMapWrapper
                  lat={facility.location.lat}
                  lng={facility.location.lng}
                />
              </div>
            ) : (
              <p className="text-slate-500 text-sm mb-2">
                Lokasi belum tersedia.
              </p>
            )}

            {facility.addressText && (
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                {facility.addressText}
              </p>
            )}
          </div>
        </aside>
      </section>

      {/* CTA / Back Action */}
      <div className="text-center pt-10">
        <Link
          href="/dashboard/all-facility"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-all hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 active:scale-[0.98]"
        >
          <Sparkles className="h-4 w-4" />
          Kembali ke Daftar Fasilitas
        </Link>
      </div>
    </main>
  );
}

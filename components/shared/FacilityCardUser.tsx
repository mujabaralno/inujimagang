"use client";

import Link from "next/link";
import { MapPin, Users, BadgeCheck, ArrowRight } from "lucide-react";
import Image from "next/image";

export type FacilityCardProps = {
  id: string;
  name: string;
  photoUrl?: string;
  addressText?: string;
  capacity?: number;
  status: "DIPINJAMKAN" | "DISEWAKAN";
};

export default function FacilityCardUser({
  id,
  name,
  photoUrl,
  addressText,
  capacity,
  status,
}: FacilityCardProps) {
  const badgeClass =
    status === "DISEWAKAN"
      ? "bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 border-indigo-200"
      : "bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 border-emerald-200";

  return (
    <Link
      href={`/facility/${id}`}
      className="group relative block overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:border-slate-300 hover:-translate-y-1"
    >
      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
        <Image
          src={photoUrl || "/placeholder.jpg"}
          width={400}
          height={300}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        
        {/* Status Badge - Positioned on Image */}
        <div className="absolute top-3 right-3">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold border backdrop-blur-sm bg-white/90 ${badgeClass} shadow-lg`}
          >
            <BadgeCheck className="h-3.5 w-3.5" />
            {status === "DISEWAKAN" ? "Disewakan" : "Dipinjamkan"}
          </span>
        </div>
      </div>

      {/* Content Container */}
      <div className="space-y-3 p-5">
        {/* Title */}
        <h3 className="line-clamp-1 text-lg font-bold text-slate-900 transition-colors group-hover:text-indigo-600">
          {name}
        </h3>

        {/* Address */}
        {addressText && (
          <div className="flex items-start gap-2 text-sm text-slate-600">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
            <span className="line-clamp-2 leading-relaxed">{addressText}</span>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          {/* Capacity */}
          <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700">
            <Users className="h-4 w-4 text-indigo-600" />
            <span>{capacity ?? 0} orang</span>
          </div>

          {/* View Details Link */}
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 transition-all group-hover:gap-2.5">
            Lihat detail
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
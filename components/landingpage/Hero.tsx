"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Search } from "lucide-react"; // opsional untuk icons

export default function Hero() {
  return (
    <section className="wrapper mt-10">
      <div className="grid gap-12 md:grid-cols-2 md:gap-8 items-center">
        {/* Content Side */}
        <div className="space-y-6 md:space-y-8">
          {/* Badge/Trust Indicator */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 w-fit">
            <MapPin className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-medium text-indigo-700">
              Kabupaten Garut
            </span>
          </div>

          {/* Headline - Focus on Outcome */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] text-slate-900 tracking-tight">
            Temukan{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Fasilitas Umum
            </span>{" "}
            dengan Mudah
          </h1>

          {/* Supporting Copy - Benefit Focused */}
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-xl">
            Platform resmi informasi aula, lapangan, ruang serbaguna, dan fasilitas umum lainnya di Kabupaten Garut. Dikembangkan bersama DISKOMINFO Garut untuk memudahkan warga.
          </p>

          {/* CTA Group */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Link
              href="/facility"
              className="group inline-flex h-12 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 px-6 font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:shadow-xl hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98]"
            >
              Jelajahi Fasilitas
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              href="/search"
              className="inline-flex h-12 items-center justify-center rounded-xl border-2 border-slate-200 bg-white px-6 font-semibold text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50 active:scale-[0.98]"
            >
              <Search className="mr-2 w-4 h-4" />
              Cari Fasilitas
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center gap-6 pt-4 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-blue-400 ring-2 ring-white" />
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-400 ring-2 ring-white" />
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 ring-2 ring-white flex items-center justify-center text-white text-xs font-bold">
                  50+
                </div>
              </div>
              <span className="font-medium">Fasilitas Terdaftar</span>
            </div>
          </div>
        </div>

        {/* Image Side */}
        <div className="relative w-full order-first md:order-last">
          {/* Decorative Elements */}
          <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-indigo-200 to-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
          <div className="absolute -bottom-8 -left-4 w-72 h-72 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }} />
          
          {/* Main Image Container */}
          <div className="relative mx-auto h-[280px] sm:h-[360px] md:h-[420px] w-full max-w-[520px]">
            <div className="relative h-full w-full overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-50 via-white to-blue-50 ring-1 ring-slate-200/60 shadow-2xl shadow-indigo-500/10">
              <Image
                src="/hero-illustration.png"
                alt="Ilustrasi fasilitas umum Kabupaten Garut"
                fill
                className="object-contain p-6 md:p-8"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

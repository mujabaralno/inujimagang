// app/about/page.tsx
import { Target, Zap, Users, Shield, Heart, MapPin, Building2, Sparkles, Award, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Tentang | Fasum Garut",
  description: "Informasi tentang proyek Fasilitas Umum Kabupaten Garut - Platform digital untuk kemudahan akses informasi fasilitas umum.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-linear-to-b from-slate-50 to-white">
      {/* Hero Section with Breadcrumb - Consistent with Facility Page */}
      <section className="border-b border-slate-200 bg-white">
        <div className="wrapper px-4 py-8 md:py-12 space-y-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-600" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-indigo-600 transition-colors">
              Beranda
            </Link>
            <span className="text-slate-400">/</span>
            <span className="font-semibold text-slate-900">Tentang</span>
          </nav>

          {/* Page Header */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 ring-1 ring-indigo-100">
              <Sparkles className="h-3.5 w-3.5" />
              Kolaborasi dengan DISKOMINFO Garut
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
              Tentang{" "}
              <span className="bg-linear-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                Fasum Garut
              </span>
            </h1>
            
            <p className="text-base md:text-lg text-slate-600 max-w-3xl leading-relaxed">
              Platform digital yang memudahkan masyarakat Kabupaten Garut dalam mengakses informasi fasilitas umum secara transparan dan efisien
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="wrapper px-4 py-12 md:py-16 space-y-16">
        {/* Mission & Story Section */}
        <section className="grid gap-8 lg:gap-12 lg:grid-cols-2 items-center">
          {/* Content */}
          <div className="space-y-6 order-2 lg:order-1">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-indigo-50 to-blue-50 px-4 py-2 text-sm font-semibold text-indigo-700 ring-1 ring-indigo-100">
                <Target className="h-4 w-4" />
                Misi Kami
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
                Menghubungkan Warga dengan Fasilitas Umum
              </h2>
            </div>

            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p className="text-base md:text-lg">
                Website ini adalah pusat informasi Fasilitas Umum di Kabupaten Garut—bagian dari{" "}
                <span className="font-semibold text-slate-900">program kerja praktek di DISKOMINFO Garut</span>.
                Misi kami adalah membantu warga menemukan fasilitas umum dengan mudah dan cepat.
              </p>
              
              <p className="text-base md:text-lg">
                Platform ini menyediakan informasi lengkap mulai dari lokasi, kapasitas, status peminjaman atau penyewaan,
                hingga detail kontak pengelola fasilitas. Semua dirancang untuk memberikan pengalaman yang{" "}
                <span className="font-semibold text-slate-900">transparan, akurat, dan user-friendly</span>.
              </p>

              {/* Key Stats */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="rounded-xl bg-linear-to-br from-indigo-50 to-blue-50 p-4 ring-1 ring-indigo-100">
                  <div className="text-3xl font-bold text-indigo-600">50+</div>
                  <div className="text-sm text-slate-600 mt-1">Fasilitas Terdaftar</div>
                </div>
                <div className="rounded-xl bg-linear-to-br from-emerald-50 to-teal-50 p-4 ring-1 ring-emerald-100">
                  <div className="text-3xl font-bold text-emerald-600">100%</div>
                  <div className="text-sm text-slate-600 mt-1">Gratis Akses</div>
                </div>
              </div>
            </div>
          </div>

          {/* Image/Illustration */}
          <div className="relative order-1 lg:order-2">
            <div className="relative mx-auto h-[320px] md:h-[400px] w-full max-w-[520px]">
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-blue-500/20 rounded-3xl blur-2xl scale-105" />
              
              {/* Image Container */}
              <div className="relative h-full w-full overflow-hidden rounded-3xl ring-1 ring-slate-200/50 bg-gradient-to-br from-indigo-50 via-white to-blue-50 shadow-2xl">
                <Image
                  src="/about-illustration.png" // ganti dengan ilustrasi tentang project
                  alt="Ilustrasi Platform Fasum Garut"
                  fill
                  className="object-contain p-8"
                />
                
                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 h-20 w-20 rounded-full bg-gradient-to-br from-indigo-400/20 to-blue-400/20 blur-xl" />
                <div className="absolute bottom-4 left-4 h-16 w-16 rounded-full bg-gradient-to-br from-blue-400/20 to-indigo-400/20 blur-xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Core Values - Enhanced Cards */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-50 to-blue-50 px-4 py-2 text-sm font-semibold text-indigo-700 ring-1 ring-indigo-100">
              <Heart className="h-4 w-4" />
              Nilai Kami
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Komitmen untuk Melayani Lebih Baik
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Prinsip-prinsip yang menjadi fondasi dalam pengembangan platform ini
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Shield,
                title: "Terbuka & Transparan",
                desc: "Informasi fasilitas umum yang mudah diakses publik kapan saja, di mana saja tanpa hambatan.",
                gradient: "from-indigo-500 to-purple-500"
              },
              {
                icon: Award,
                title: "Akurat & Terpercaya",
                desc: "Data dikurasi dan dikelola langsung oleh DISKOMINFO Garut untuk memastikan keakuratan informasi.",
                gradient: "from-emerald-500 to-teal-500"
              },
              {
                icon: Zap,
                title: "Cepat & Efisien",
                desc: "Pencarian dan filter real-time tanpa loading berlebihan untuk pengalaman yang mulus dan responsif.",
                gradient: "from-blue-500 to-cyan-500"
              },
            ].map((value) => (
              <div
                key={value.title}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 md:p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-slate-200/60 hover:-translate-y-1"
              >
                {/* Icon */}
                <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${value.gradient} text-white shadow-lg mb-5 transition-transform group-hover:scale-110`}>
                  <value.icon className="h-7 w-7" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base">{value.desc}</p>

                {/* Bottom accent */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${value.gradient} transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100`} />
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-50 to-blue-50 px-4 py-2 text-sm font-semibold text-indigo-700 ring-1 ring-indigo-100">
              <Sparkles className="h-4 w-4" />
              Fitur Unggulan
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Apa yang Kami Tawarkan
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Platform lengkap dengan berbagai fitur untuk kemudahan akses informasi
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                icon: MapPin,
                title: "Peta Lokasi Interaktif",
                description: "Temukan lokasi fasilitas dengan mudah melalui peta interaktif Google Maps yang terintegrasi."
              },
              {
                icon: Users,
                title: "Informasi Kapasitas",
                description: "Detail kapasitas setiap fasilitas untuk membantu perencanaan acara Anda."
              },
              {
                icon: CheckCircle2,
                title: "Status Real-Time",
                description: "Informasi status peminjaman atau penyewaan yang selalu update dan akurat."
              },
              {
                icon: Building2,
                title: "Manajemen Data Admin",
                description: "Panel admin & superadmin untuk pengelolaan data fasilitas yang efisien dan terstruktur."
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-indigo-200 hover:bg-gradient-to-br hover:from-indigo-50/50 hover:to-blue-50/50"
              >
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-100 to-blue-100 text-indigo-600">
                    <feature.icon className="h-6 w-6" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-slate-900">{feature.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Team/Contact Section */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-50 to-blue-50 px-4 py-2 text-sm font-semibold text-indigo-700 ring-1 ring-indigo-100">
              <Users className="h-4 w-4" />
              Kerjasama
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Didukung oleh DISKOMINFO Garut
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Proyek ini merupakan hasil kolaborasi antara mahasiswa kerja praktek dengan Dinas Komunikasi dan Informatika Kabupaten Garut
            </p>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-slate-50 to-white border-2 border-slate-200 p-8 md:p-12">
            <div className="grid gap-8 md:grid-cols-2 items-center">
              {/* Logo/Image Placeholder */}
              <div className="relative h-48 md:h-64 rounded-2xl bg-gradient-to-br from-indigo-100 to-blue-100 flex items-center justify-center overflow-hidden">
                <Building2 className="h-24 w-24 text-indigo-300" />
                {/* Replace with actual logo:
                <Image
                  src="/diskominfo-logo.png"
                  alt="Logo DISKOMINFO Garut"
                  fill
                  className="object-contain p-8"
                />
                */}
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900">
                  Dinas Komunikasi dan Informatika
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Kabupaten Garut
                </p>
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <a
                    href="https://diskominfo.garutkab.go.id"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Kunjungi Website
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Call to Action - Consistent with Facility Page */}
      <section className="wrapper px-4 py-12 md:py-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-blue-600 to-indigo-700 p-8 md:p-12 text-center">
          {/* Background Decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-white blur-3xl" />
            <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-white blur-3xl" />
          </div>

          <div className="relative z-10 mx-auto max-w-2xl space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Siap Menemukan Fasilitas yang Anda Butuhkan?
            </h2>
            <p className="text-indigo-100 text-base md:text-lg leading-relaxed">
              Jelajahi berbagai fasilitas umum yang tersedia di Kabupaten Garut dan temukan yang paling sesuai untuk kebutuhan Anda
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <a
                href="/all-facility"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-indigo-600 shadow-lg transition-all hover:scale-105 hover:shadow-xl active:scale-100"
              >
                Jelajahi Fasilitas
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/30 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 active:scale-95"
              >
                Hubungi Kami
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

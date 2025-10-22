"use client";

import { useState } from "react";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageSquare,  
  CheckCircle2,
  Sparkles,
  User,
  FileText
} from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  const [state, setState] = useState({ 
    name: "", 
    email: "", 
    subject: "", 
    message: "" 
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    
    // Simulasi submit; ganti dengan action server bila perlu
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setState({ name: "", email: "", subject: "", message: "" });
        setSubmitted(false);
      }, 3000);
    }, 900);
  }

  return (
    <main className="min-h-screen ">
      {/* Hero Section - Consistent with other pages */}
      <section className="border-b border-slate-200 bg-white">
        <div className="wrapper px-4 py-8 md:py-12 space-y-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-600" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-indigo-600 transition-colors">
              Beranda
            </Link>
            <span className="text-slate-400">/</span>
            <span className="font-semibold text-slate-900">Kontak</span>
          </nav>

          {/* Page Header */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 ring-1 ring-indigo-100">
              <MessageSquare className="h-3.5 w-3.5" />
              Hubungi Kami
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
              Mari{" "}
              <span className="bg-linear-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                Terhubung
              </span>
            </h1>
            
            <p className="text-base md:text-lg text-slate-600 max-w-3xl leading-relaxed">
              Ada pertanyaan, masukan, atau ingin berkolaborasi? Tim kami siap membantu Anda. 
              Kirimkan pesan melalui formulir di bawah atau hubungi kami langsung
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="wrapper px-4 py-12 md:py-16">
        <div className="grid gap-8 lg:gap-12 lg:grid-cols-3">
          {/* Contact Form - 2 columns */}
          <div className="lg:col-span-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
              {/* Form Header */}
              <div className="mb-8 space-y-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-indigo-100 to-blue-100">
                    <Send className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Kirim Pesan</h2>
                    <p className="text-sm text-slate-600">Isi formulir di bawah dan kami akan segera merespons</p>
                  </div>
                </div>
              </div>

              {/* Success Message */}
              {submitted && (
                <div className="mb-6 rounded-2xl bg-linear-to-r from-emerald-50 to-teal-50 border border-emerald-200 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500">
                      <CheckCircle2 className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-emerald-900">Pesan Berhasil Terkirim! 🎉</p>
                      <p className="text-sm text-emerald-700">Terima kasih telah menghubungi kami. Kami akan merespons segera.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Form */}
              <form onSubmit={onSubmit} className="space-y-6">
                {/* Name & Email - Grid */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <label className="space-y-2">
                    <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <User className="h-4 w-4 text-slate-400" />
                      Nama Lengkap <span className="text-red-500">*</span>
                    </span>
                    <input
                      type="text"
                      className="h-12 w-full rounded-xl border-2 border-slate-200 bg-white px-4 text-slate-900 placeholder:text-slate-400 transition-all outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                      placeholder="Masukkan nama Anda"
                      value={state.name}
                      onChange={(e) => setState((s) => ({ ...s, name: e.target.value }))}
                      required
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <Mail className="h-4 w-4 text-slate-400" />
                      Email <span className="text-red-500">*</span>
                    </span>
                    <input
                      type="email"
                      className="h-12 w-full rounded-xl border-2 border-slate-200 bg-white px-4 text-slate-900 placeholder:text-slate-400 transition-all outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                      placeholder="nama@email.com"
                      value={state.email}
                      onChange={(e) => setState((s) => ({ ...s, email: e.target.value }))}
                      required
                    />
                  </label>
                </div>

                {/* Subject */}
                <label className="space-y-2 block">
                  <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <FileText className="h-4 w-4 text-slate-400" />
                    Subjek <span className="text-red-500">*</span>
                  </span>
                  <input
                    type="text"
                    className="h-12 w-full rounded-xl border-2 border-slate-200 bg-white px-4 text-slate-900 placeholder:text-slate-400 transition-all outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                    placeholder="Topik pesan Anda"
                    value={state.subject}
                    onChange={(e) => setState((s) => ({ ...s, subject: e.target.value }))}
                    required
                  />
                </label>

                {/* Message */}
                <label className="space-y-2 block">
                  <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <MessageSquare className="h-4 w-4 text-slate-400" />
                    Pesan <span className="text-red-500">*</span>
                  </span>
                  <textarea
                    rows={6}
                    className="w-full rounded-xl border-2 border-slate-200 bg-white p-4 text-slate-900 placeholder:text-slate-400 transition-all outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 resize-none"
                    placeholder="Tuliskan pesan Anda di sini..."
                    value={state.message}
                    onChange={(e) => setState((s) => ({ ...s, message: e.target.value }))}
                    required
                  />
                  <p className="text-xs text-slate-500">
                    Minimal 10 karakter
                  </p>
                </label>

                {/* Form Actions */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={loading || submitted}
                    className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-indigo-600 to-blue-600 px-6 font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {loading ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Mengirim...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        Kirim Pesan
                      </>
                    )}
                  </button>

                  <a
                    href={`mailto:diskominfo@garutkab.go.id?subject=${encodeURIComponent(state.subject)}&body=${encodeURIComponent(
                      `${state.message}\n\n--\n${state.name} • ${state.email}`
                    )}`}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-6 font-semibold text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50 active:scale-[0.98]"
                  >
                    <Mail className="h-4 w-4" />
                    Kirim via Email
                  </a>
                </div>

                {/* Privacy Notice */}
                <p className="text-xs text-slate-500 leading-relaxed">
                  Dengan mengirimkan formulir ini, Anda setuju bahwa informasi yang Anda berikan akan digunakan 
                  sesuai dengan kebijakan privasi kami untuk merespons pertanyaan Anda.
                </p>
              </form>
            </div>
          </div>

          {/* Contact Information Sidebar - 1 column */}
          <div className="space-y-6">
            {/* Contact Methods */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900">Informasi Kontak</h3>
              
              {/* Email Card */}
              <a
                href="mailto:diskominfo@garutkab.go.id"
                className="group block rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:border-indigo-200 hover:shadow-lg hover:-translate-y-0.5"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-indigo-100 to-blue-100 text-indigo-600 transition-transform group-hover:scale-110">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-slate-900">Email</p>
                    <p className="text-sm text-indigo-600 font-medium">diskominfo@garutkab.go.id</p>
                    <p className="text-xs text-slate-500">Respons dalam 1-2 hari kerja</p>
                  </div>
                </div>
              </a>

              {/* Phone Card */}
              <Link
                href="tel:+622621234567"
                className="group block rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:border-emerald-200 hover:shadow-lg hover:-translate-y-0.5"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-emerald-100 to-teal-100 text-emerald-600 transition-transform group-hover:scale-110">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-slate-900">Telepon</p>
                    <p className="text-sm text-emerald-600 font-medium">(0262) 123-4567</p>
                    <p className="text-xs text-slate-500">Senin - Jumat, 08:00 - 16:00</p>
                  </div>
                </div>
              </Link>

              {/* Address Card */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-purple-100 to-pink-100 text-purple-600">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-slate-900">Alamat Kantor</p>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Dinas Komunikasi dan Informatika<br />
                      Kabupaten Garut<br />
                      Jl. Pembangunan No. 123<br />
                      Garut, Jawa Barat 44151
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="rounded-2xl bg-linear-to-br from-indigo-50 via-blue-50 to-indigo-50 border border-indigo-100 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-5 w-5 text-indigo-600" />
                <h3 className="font-bold text-slate-900">Tips Cepat</h3>
              </div>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-indigo-600 mt-0.5 shrink-0" />
                  <span>Pastikan email valid untuk respons yang cepat</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-indigo-600 mt-0.5 shrink-0" />
                  <span>Sertakan detail lengkap dalam pesan Anda</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-indigo-600 mt-0.5 shrink-0" />
                  <span>Cek folder spam untuk respons email kami</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12 md:mt-16">
          <div className="space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-indigo-50 to-blue-50 px-4 py-2 text-sm font-semibold text-indigo-700 ring-1 ring-indigo-100">
                <MapPin className="h-4 w-4" />
                Lokasi Kami
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                Kunjungi Kantor Kami
              </h2>
              <p className="text-slate-600">
                Anda juga dapat mengunjungi kantor kami secara langsung pada jam operasional
              </p>
            </div>

            {/* Map Embed Placeholder */}
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-lg">
              <div className="aspect-video md:aspect-21/9 w-full">
                {/* Replace with actual Google Maps embed */}
                <div className="flex h-full items-center justify-center bg-linear-to-br from-slate-100 to-slate-50">
                  <div className="text-center space-y-3">
                    <MapPin className="h-16 w-16 text-slate-300 mx-auto" />
                    <p className="text-slate-500 font-medium">Google Maps Embed Here</p>
                    <p className="text-sm text-slate-400 max-w-xs">
                      Ganti dengan iframe Google Maps atau komponen peta interaktif
                    </p>
                  </div>
                </div>
                {/* Example Google Maps embed:
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18..."
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi DISKOMINFO Garut"
                />
                */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section - Consistent with other pages */}
      <section className="wrapper px-4 pb-12 md:pb-16">
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-indigo-600 via-blue-600 to-indigo-700 p-8 md:p-12 text-center">
          {/* Background Decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-white blur-3xl" />
            <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-white blur-3xl" />
          </div>

          <div className="relative z-10 mx-auto max-w-2xl space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Butuh Informasi Lebih Lanjut?
            </h2>
            <p className="text-indigo-100 text-base md:text-lg leading-relaxed">
              Jelajahi halaman tentang kami untuk mengetahui lebih lanjut tentang platform ini atau 
              lihat daftar fasilitas yang tersedia
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <a
                href="/about"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-indigo-600 shadow-lg transition-all hover:scale-105 hover:shadow-xl active:scale-100"
              >
                Tentang Kami
              </a>
              <a
                href="/all-facility"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/30 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 active:scale-95"
              >
                Lihat Fasilitas
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

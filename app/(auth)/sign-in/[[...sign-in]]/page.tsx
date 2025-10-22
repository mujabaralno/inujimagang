"use client";

import { SignIn } from "@clerk/nextjs";
import {  Sparkles } from "lucide-react";

export default function SignInPage() {
  return (
    <main className="min-h-screen bg-linear-to-b from-slate-50 to-white flex items-center justify-center px-4 py-20">
      <div className="max-w-5xl w-full grid gap-12 lg:grid-cols-2 items-center">
        {/* Left Section: Intro Message */}
        <section className="hidden lg:block space-y-6 pl-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700 ring-1 ring-indigo-100">
            <Sparkles className="h-4 w-4" />
            Selamat Datang di Fasum Garut
          </div>

          <h1 className="text-4xl font-bold text-slate-900 leading-tight tracking-tight">
            Akses{" "}
            <span className="bg-linear-to-r from-indigo-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Informasi Fasilitas Umum
            </span>{" "}
            Lebih Cepat
          </h1>

          <p className="text-slate-600 leading-relaxed text-lg max-w-md">
            Masuk untuk mengelola data, menjelajahi fasilitas, dan menikmati fitur eksklusif Fasum Garut.
          </p>


        
        </section>

        {/* Right Section: Clerk Sign-In */}
        <section className="relative flex justify-center items-center">
         

            {/* Clerk SignIn Form */}
            <SignIn
              appearance={{
                elements: {
                  formButtonPrimary:
                    "bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold rounded-xl hover:scale-[1.02] hover:shadow-lg shadow-indigo-500/30 transition-all duration-200 active:scale-95",
                  formButtonSecondary:
                    "border-slate-200 text-slate-700 hover:bg-slate-50",
                  card: "shadow-none border-0 bg-transparent",
                  socialButtonsBlockButton:
                    "border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-all",
                  headerTitle: "text-slate-900 font-bold text-lg text-center",
                  headerSubtitle: "text-slate-500 text-sm text-center",
                  formFieldInput:
                    "rounded-xl border-2 border-slate-200 px-4 py-2 text-slate-900 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500",
                  footerActionText: "text-slate-600 text-sm",
                  footerActionLink: "text-indigo-600 hover:underline font-medium",
                },
                layout: {
                  socialButtonsPlacement: "bottom",
                },
              }}
              afterSignInUrl="/"
              redirectUrl="/"
            />
        </section>
      </div>
    </main>
  );
}

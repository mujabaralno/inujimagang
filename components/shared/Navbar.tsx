"use client";

import { navLinks } from "@/constants";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-100 w-full bg-white/80 backdrop-blur-md border-b border-slate-200/60 shadow-sm">
      <div className="wrapper relative flex items-center justify-between px-4 py-4 md:py-5">
        {/* Logo/Beranda */}
        <Link
          href="/"
          className="flex items-center gap-2 group cursor-pointer"
        >
          <span className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight transition-colors group-hover:text-indigo-600">
            Garut<span className="text-indigo-600">Fasum</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => {
            const isActive = pathname === item.route;
            return (
              <Link
                key={item.label}
                href={item.route}
                className={`text-sm font-semibold transition-colors ${
                  isActive
                    ? "text-indigo-600"
                    : "text-slate-600 hover:text-indigo-500"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Section (User/Auth) */}
        <div className="flex items-center gap-4">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <Link
              href="/sign-in"
              className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 bg-linear-to-r from-indigo-600 to-blue-600 px-5 font-semibold text-white shadow-sm transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-indigo-500/30 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 active:scale-[0.98]"
            >
              Masuk
            </Link>
          </SignedOut>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100 transition-all focus-visible:ring-2 focus-visible:ring-indigo-500"
            aria-label="Buka menu navigasi"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`absolute left-0 top-full w-full transform transition-all duration-300 ease-in-out bg-white/95 backdrop-blur-xl border-t border-slate-100 md:hidden ${
            mobileOpen
              ? "opacity-100 visible translate-y-0"
              : "opacity-0 invisible -translate-y-4"
          }`}
        >
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((item) => {
              const isActive = pathname === item.route;
              return (
                <Link
                  key={item.label}
                  href={item.route}
                  className={`block rounded-lg px-4 py-2 text-base font-semibold transition-all ${
                    isActive
                      ? "bg-linear-to-r from-indigo-50 to-blue-50 text-indigo-600 ring-1 ring-indigo-100"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
            <SignedOut>
              <Link
                href="/sign-in"
                onClick={() => setMobileOpen(false)}
                className="block text-center rounded-xl bg-linear-to-r from-indigo-600 to-blue-600 px-5 py-3 font-semibold text-white shadow-md shadow-indigo-500/30 hover:scale-[1.02] transition-all active:scale-[0.98]"
              >
                Masuk
              </Link>
            </SignedOut>
          </div>
        </div>
      </div>
    </header>
  );
}

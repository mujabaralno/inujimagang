"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { sidebarLinksSuperAdmin } from "@/constants";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Menu } from "lucide-react";

const SidebarSuperadmin = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside
      className={cn(
        "sticky top-0 left-0 z-50 flex flex-col bg-white/60 backdrop-blur-md border-r border-slate-200 shadow-md transition-all duration-300 ease-in-out",
        isOpen ? "w-64" : "w-20"
      )}
    >
      {/* Header Section */}
      <div
        className={cn(
          "flex items-center justify-between px-4 py-5 border-b border-slate-100 transition-all",
          !isOpen && "px-3"
        )}
      >
        <div className="flex items-center gap-3">

          {isOpen && (
            <div className="flex flex-col">
              <p className="text-lg font-extrabold tracking-tight text-slate-900">
                Garut
              </p>
              <span className="text-xs font-medium text-indigo-600">Fasum</span>
            </div>
          )}
        </div>

        {/* Collapse / Toggle Button */}
        <button
          aria-label="Toggle sidebar"
          onClick={() => setIsOpen(!isOpen)}
          className="hidden md:flex items-center justify-center rounded-lg border border-slate-200 bg-white p-1.5 text-slate-600 hover:text-indigo-600 hover:border-indigo-300 transition-colors"
        >
          {isOpen ? (
            <ChevronLeft className="h-5 w-5" />
          ) : (
            <ChevronRight className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Links Section */}
      <nav className="flex-1 p-3 mt-2 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
        {sidebarLinksSuperAdmin.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link href={link.href} key={link.name}>
              <div
                className={cn(
                  "group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition-all duration-200 cursor-pointer hover:bg-indigo-50 hover:text-indigo-600",
                  isActive
                    ? "bg-linear-to-r from-indigo-600 to-blue-600 text-white shadow-md shadow-indigo-500/30"
                    : "text-slate-600"
                )}
              >
                <Icon
                  className={cn(
                    "h-5 w-5 shrink-0 transition-colors",
                    isActive
                      ? "text-white"
                      : "text-slate-400 group-hover:text-indigo-600"
                  )}
                />
                {isOpen && (
                  <span
                    className={cn(
                      "whitespace-nowrap transition-opacity duration-200",
                      !isOpen && "opacity-0"
                    )}
                  >
                    {link.name}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Footer Section */}
      <div
        className={cn(
          "mt-auto border-t border-slate-100 px-4 py-3 bg-linear-to-r from-indigo-50 to-blue-50",
          !isOpen && "px-2"
        )}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex md:hidden items-center justify-center w-full gap-2 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold text-sm py-2 transition-all hover:border-indigo-300 hover:text-indigo-600 active:scale-[0.98]"
        >
          <Menu className="h-4 w-4" />
          {isOpen && "Tutup Sidebar"}
        </button>

        {isOpen && (
          <p className="hidden md:block text-xs text-slate-500 pt-3 text-center">
            © 2025 DISKOMINFO Garut
          </p>
        )}
      </div>
    </aside>
  );
};

export default SidebarSuperadmin;

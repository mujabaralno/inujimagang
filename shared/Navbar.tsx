"use client"
import { navLinks } from "@/constants";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <header className="w-full sticky top-0 bg-black">
      <div className="w-full max-w-7xl md:mx-auto flex justify-between items-center px-4 py-4">
        <div>
          <h3 className="text-2xl font-semibold text-white">GARUT</h3>
        </div>
        <div>
          <ul className="flex flex-col md:flex-row gap-5 w-full">
            {navLinks.map((item) => {
              const isActive = pathname == item.route;
              return (
                <Link
                  href={item.route}
                  key={item.label}
                  className={`text-md font-medium ${
                    isActive ? "text-white" : "text-gray-400"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </ul>
        </div>
        <div className="flex justify-end items-center w-40">
            <SignedIn>
                <UserButton />
            </SignedIn>
            <SignedOut>
                <Link 
                href="/sign-in"
                className="text-black bg-white px-4 py-2 rounded-md border border-slate-200 border-dashed">
                Sign-in
                </Link>
            </SignedOut>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

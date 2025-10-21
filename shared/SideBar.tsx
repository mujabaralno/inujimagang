"use client";
import Image from "next/image";
import React from "react";
import { usePathname } from "next/navigation";
import { sidebarLinks } from "@/constants";
import Link from "next/link";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 left-0 w-60 bg-white shadow-lg p-3 min-h-screen">
      <div className="p-4">
        <Image src="/next.svg" alt="logo" width={100} height={100} />
      </div>

      <div className="mt-10 flex flex-col gap-2">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.href;
          const ItemsComponent = link.icon;
          return (
            <Link className="" href={link.href} key={link.name}>
              <div
                className={cn(
                  "flex gap-4 items-center p-4 rounded-lg justify-start",
                  isActive && "bg-[#25388C] shadow-sm"
                )}
              >
                <div className="relative size-5">
                  <ItemsComponent className={isActive ? "text-white" : "text-gray-400"}/>
                </div>

                <p className={cn(isActive ? "text-white" : "text-gray-400")}>
                  {link.name}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;

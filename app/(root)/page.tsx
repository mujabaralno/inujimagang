import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {  SignedOut } from "@clerk/nextjs";
import Hero from "@/components/landingpage/Hero";
import FacilityCardSection from "@/components/landingpage/FacillityCard";
import { Suspense } from "react";
import FacilitySection, { FacilitySectionFallback } from "@/components/shared/FacilitySection";

export default async function Home() {
  const { userId, sessionClaims } = await auth();

  if (!userId) {
    return (
      <SignedOut>
        <main className="p-6">
          <Hero />
          <Suspense fallback={<FacilitySectionFallback />}>
          {/* FacilitySection delay 1 detik → skeleton muncul */}
          {/* Kalau kamu nggak pakai Suspense, tinggal render <FacilitySection /> langsung */}
          {/* Tapi Suspense + fallback bikin UX lebih halus */}
          {/* Note: FacilitySection itu server component */}
          <FacilitySection />
        </Suspense>
        </main>
      </SignedOut>
    );
  }

  const role = sessionClaims?.role as string | undefined;

  if (role === "superadmin") redirect("/superadmin");
  if (role === "admin") redirect("/dashboard");


  redirect("/");
}

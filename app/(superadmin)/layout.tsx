import Header from "@/components/shared/Header";
import SidebarSuperadmin from "@/components/shared/SideBarSuperadmin";
import { Toaster } from "@/components/ui/sonner";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <div className="flex bg-[#F8F8FF]">
        <SidebarSuperadmin />

        <section className="w-full">
          <Header />
          <div className="w-full">{children}</div>
          <Toaster />
        </section>
      </div>
    </main>
  );
}

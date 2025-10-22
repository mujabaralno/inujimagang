import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/SideBar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <div className="flex bg-[#F8F8FF]">
        <Sidebar />

        <section className="w-full">
          <Header />
          <div className="w-full">{children}</div>
        </section>
      </div>
    </main>
  );
}

import Sidebar from "@/shared/SideBar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
         <div className="flex bg-[#F8F8FF]">
        <Sidebar />

        <section className="wrapper">

          <div className="w-full">
            {children}
          </div>
        </section>
      </div>
    </main>
  );
}

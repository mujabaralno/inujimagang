import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="bg-[#F8F8FF]">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}

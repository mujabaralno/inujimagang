import Navbar from "@/shared/Navbar";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
        <Navbar />
      {children}
    </main>
  );
}

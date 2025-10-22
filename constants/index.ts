import { Activity, Building, Building2, LayoutDashboard, MapPin, Plus, Users } from "lucide-react"
import type { FacilityFormValues } from "@/lib/validators/facility";

export const navLinks = [
    {
        label: "Home",
        route: "/"
    },
    {
        label: "Facillity",
        route: "/facility"
    },
    {
        label: "About",
        route: "/about"
    },
    {
        label: "Contact",
        route: "/contact"
    }
]

export const sidebarLinks = [
    {
        name: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard
    },
    {
        name: "All Facillity",
        href: "/dashboard/all-facility",
        icon: Building
    },
    {
        name: "Create Facillity",
        href: "/dashboard/create-facillity",
        icon: Plus
    },
]

export const sidebarLinksSuperAdmin = [
    {
        name: "Dashboard",
        href: "/superadmin",
        icon: LayoutDashboard
    },
    {
        name: "Users",
        href: "/superadmin/all-users",
        icon: Building
    },
]



export const FacilityDefaultValues: FacilityFormValues = {
  name: "",
  description: "",
  photoUrl: "",
  addressText: "",
  capacity: undefined,
  categoryId: "",
  picName: "",
  contact: { phone: "", email: "" },
  facilities: [],
  status: "DIPINJAMKAN", 
  location: undefined,
};

export const stats = [
    {
      label: "Total Fasilitas",
      value: "52",
      icon: Building2,
      color: "from-indigo-500 to-blue-500",
      change: "+10%",
    },
    {
      label: "Peminjaman Aktif",
      value: "18",
      icon: Activity,
      color: "from-emerald-500 to-teal-500",
      change: "+4%",
    },
    {
      label: "Pengguna Terdaftar",
      value: "1.245",
      icon: Users,
      color: "from-violet-500 to-purple-500",
      change: "+12%",
    },
    {
      label: "Lokasi Tercatat",
      value: "27",
      icon: MapPin,
      color: "from-orange-500 to-amber-500",
      change: "+5%",
    },
  ];
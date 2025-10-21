import { Building, LayoutDashboard, Plus, Settings } from "lucide-react"

export const navLinks = [
    {
        label: "Home",
        route: "/"
    },
    {
        label: "Facillity",
        route: "/fasillity"
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
        href: "/dashboard/all-facillity",
        icon: Building
    },
    {
        name: "Create Facillity",
        href: "/dashboard/create-facillity",
        icon: Plus
    },
    {
        name: "Setting",
        href: "/dashboard/setting",
        icon: Settings
    },
]
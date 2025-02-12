import {
  LucideIcon,
  LayoutDashboard,
  Package,
  Users,
  Settings,
} from "lucide-react";

export interface DashboardRoute {
  path: string;
  label: string;
  icon: LucideIcon;
}

export const adminDashboardRoutes: DashboardRoute[] = [
  {
    path: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    path: "/dashboard/products",
    label: "Products",
    icon: Package,
  },
  {
    path: "/dashboard/users",
    label: "Users",
    icon: Users,
  },
  {
    path: "/dashboard/settings",
    label: "Settings",
    icon: Settings,
  },
];

export const userDashboardRoutes: DashboardRoute[] = [
  {
    path: "/user-dashboard",
    label: "Orders",
    icon: LayoutDashboard,
  },
  {
    path: "/user-dashboard/userprofile",
    label: "Profile",
    icon: Users,
  },
];

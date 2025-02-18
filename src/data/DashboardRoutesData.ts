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
    label: "Orders",
    icon: Package,
  },
  {
    path: "/dashboard/users",
    label: "Users",
    icon: Users,
  },
  {
    path: "/dashboard/books",
    label: "Book Management",
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

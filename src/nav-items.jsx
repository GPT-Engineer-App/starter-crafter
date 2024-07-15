import { Home, ClipboardList } from "lucide-react";
import Index from "./pages/Index.jsx";
import ActivityLog from "./pages/ActivityLog.jsx";

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <Home className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Activity Log",
    to: "/activity-log",
    icon: <ClipboardList className="h-4 w-4" />,
    page: <ActivityLog />,
  },
];
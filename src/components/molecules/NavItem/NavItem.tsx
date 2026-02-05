import type { LucideIcon } from "lucide-react";
import type { Page } from "../../../types/dashboard.types";

interface NavItemProps {
  id: Page;
  label: string;
  icon: LucideIcon;
  isActive: boolean;
  isCollapsed: boolean;
  onClick: (page: Page) => void;
}

export function NavItem({ id, label, icon: Icon, isActive, isCollapsed, onClick }: NavItemProps) {
  return (
    <button
      onClick={() => onClick(id)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
        isActive
          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
      }`}
    >
      <Icon className="w-5 h-5 shrink-0" />
      {!isCollapsed && <span>{label}</span>}
    </button>
  );
}

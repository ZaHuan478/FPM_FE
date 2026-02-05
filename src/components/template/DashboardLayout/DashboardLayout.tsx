import { useState } from "react";
import {
  LayoutDashboard,
  ArrowLeftRight,
  PieChart,
  FileText,
  Settings,
} from "lucide-react";
import { Sidebar } from "../../organisms/Sidebar/Sidebar";
import { Header } from "../../organisms/Header/Header";
import type { Page, User, Theme, Language } from "../../../types/dashboard.types";
import { useTranslation } from "../../../locales/translations";

interface DashboardLayoutProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
  theme: Theme;
  onToggleTheme: () => void;
  language: Language;
  user: User | null;
  children: React.ReactNode;
}

export function DashboardLayout({
  currentPage,
  onPageChange,
  theme,
  onToggleTheme,
  language,
  user,
  children,
}: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const t = useTranslation(language);

  const navItems = [
    { id: "overview" as Page, label: t.overview, icon: LayoutDashboard },
    { id: "transactions" as Page, label: t.transactions, icon: ArrowLeftRight },
    { id: "budgeting" as Page, label: t.budgeting, icon: PieChart },
    { id: "reports" as Page, label: t.reports, icon: FileText },
    { id: "settings" as Page, label: t.settings, icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        navItems={navItems}
        currentPage={currentPage}
        onPageChange={onPageChange}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        isMobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
        theme={theme}
        onToggleTheme={onToggleTheme}
        themeLabel={t.theme}
        user={user}
      />

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${
          sidebarCollapsed ? "lg:pl-20" : "lg:pl-72"
        }`}
      >
        {/* Header */}
        <Header
          onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
          searchPlaceholder={t.search}
          profileLabel={t.profile}
          settingsLabel={t.settings}
          logoutLabel={t.logout}
          onPageChange={onPageChange}
          user={user}
          notificationCount={3}
        />

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

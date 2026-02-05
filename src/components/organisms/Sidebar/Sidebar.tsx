import { ChevronLeft, ChevronRight, X, Moon, Sun } from "lucide-react";
import  Button  from "../../atoms/Button/Button";
import { NavItem } from "../../molecules/NavItem/NavItem";
import { UserProfile } from "../../molecules/UserProfile/UserProfile";
import type { NavItem as NavItemType, Page, Theme, User } from "../../../types/dashboard.types";

type SidebarProps = {
    navItems: NavItemType[];
    currentPage: Page;
    onPageChange: (page: Page) => void;
    isCollapsed: boolean;
    onToggleCollapse: () => void;
    isMobileOpen: boolean;
    onCloseMobile: () => void;
    theme: Theme;
    onToggleTheme: () => void;
    themeLabel: string;
    user: User | null;
}

export function Sidebar({
    navItems,
    currentPage,
    onPageChange,
    isCollapsed,
    onToggleCollapse,
    isMobileOpen,
    onCloseMobile,
    theme,
    onToggleTheme,
    themeLabel,
    user,
}: SidebarProps) {
    const handleNavClick = (page: Page) => {
        onPageChange(page);
        onCloseMobile();
    };

    return (
        <aside
            className={`fixed top-0 left-0 z-50 h-screen bg-white dark:bg-slate-900 border-r flex flex-col transition-all duration-300 ${isCollapsed ? "w-20" : "w-72"
                } ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                }`}
        >
            {/* Header */}
            <div className="flex items-center justify-between p-6">
                {!isCollapsed && (
                    <div className="flex items-center gap-2">
                        <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-xl">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M21 18v1a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v1M9 12h6m-6 4h6m-6-8h6" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold">FinanceFlow</span>
                    </div>
                )}
                <Button
                    variant="outline"
                    size="sm"
                    className="hidden lg:flex rounded-xl"
                    onClick={onToggleCollapse}
                >
                    {isCollapsed ? (
                        <ChevronRight className="w-5 h-5" />
                    ) : (
                        <ChevronLeft className="w-5 h-5" />
                    )}
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    className="lg:hidden rounded-xl"
                    onClick={onCloseMobile}
                >
                    <X className="w-5 h-5" />
                </Button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 space-y-1">
                {navItems.map((item) => (
                    <NavItem
                        key={item.id}
                        id={item.id}
                        label={item.label}
                        icon={item.icon}
                        isActive={currentPage === item.id}
                        isCollapsed={isCollapsed}
                        onClick={handleNavClick}
                    />
                ))}
            </nav>

            {/* Footer */}
            <div className="p-4 space-y-3 border-t">
                <Button
                    variant="outline"
                    className={`w-full justify-start gap-3 rounded-xl ${isCollapsed ? "justify-center" : ""
                        }`}
                    onClick={onToggleTheme}
                >
                    {theme === "light" ? (
                        <Moon className="w-5 h-5 shrink-0" />
                    ) : (
                        <Sun className="w-5 h-5 shrink-0" />
                    )}
                    {!isCollapsed && <span>{themeLabel}</span>}
                </Button>

                <UserProfile user={user} isCollapsed={isCollapsed} />
            </div>
        </aside>
    );
}

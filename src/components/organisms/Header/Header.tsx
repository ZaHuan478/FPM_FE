import { Menu, Search, Bell, Settings, LogOut, User as UserIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../../atoms/Avatar/Avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../../atoms/DropdownMenu/DropdownMenu";
import type { User, Page } from "../../../types/dashboard.types";

interface HeaderProps {
    onOpenMobileSidebar: () => void;
    searchPlaceholder: string;
    profileLabel: string;
    settingsLabel: string;
    logoutLabel: string;
    onPageChange: (page: Page) => void;
    user: User | null;
    notificationCount?: number;
}

export function Header({
    onOpenMobileSidebar,
    searchPlaceholder,
    profileLabel,
    settingsLabel,
    logoutLabel,
    onPageChange,
    user,
    notificationCount = 0,
}: HeaderProps) {
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
    };

    return (
        <header className="sticky top-0 z-30 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between px-6 py-4">
                {/* Left side - Mobile menu button & Search */}
                <div className="flex items-center gap-4 flex-1">
                    {/* Mobile Menu Button */}
                    <button
                        onClick={onOpenMobileSidebar}
                        className="lg:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                        aria-label="Open menu"
                    >
                        <Menu className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                    </button>

                    {/* Search Bar */}
                    <div className="hidden sm:flex items-center flex-1 max-w-md">
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder={searchPlaceholder}
                                className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
                            />
                        </div>
                    </div>
                </div>

                {/* Right side - Notifications & Profile */}
                <div className="flex items-center gap-4">
                    {/* Notifications */}
                    <button className="relative p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                        <Bell className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                        {notificationCount > 0 && (
                            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs font-semibold rounded-full flex items-center justify-center">
                                {notificationCount > 9 ? "9+" : notificationCount}
                            </span>
                        )}
                    </button>

                    {/* User Profile Dropdown */}
                    {user && (
                        <DropdownMenu>
                            <DropdownMenuTrigger className="focus:outline-none">
                                <div className="flex items-center gap-2 p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                                    <Avatar className="w-8 h-8">
                                        <AvatarImage src={user.avatar} />
                                        <AvatarFallback>
                                            {user.name
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")
                                                .toUpperCase()
                                                .slice(0, 2)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <span className="hidden md:block text-sm font-medium text-slate-700 dark:text-slate-300">
                                        {user.name}
                                    </span>
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <div className="px-2 py-1.5">
                                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                                        {user.name}
                                    </p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        {user.email}
                                    </p>
                                </div>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => onPageChange("settings")}>
                                    <Settings className="mr-2 h-4 w-4" />
                                    <span>{settingsLabel}</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={handleLogout}>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>{logoutLabel}</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
            </div>
        </header>
    );
}

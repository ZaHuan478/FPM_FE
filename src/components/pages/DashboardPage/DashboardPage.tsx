import { useState } from "react";
import { DashboardLayout } from "../../template/DashboardLayout/DashboardLayout";
import { DashboardOverview } from "../DashboardPage/DashboardOverview";
import { TransactionsPage } from "../TransactionsPage/TransactionsPage";
import type { Page, Language } from "../../../types/dashboard.types";
import { useTheme } from "../../../hooks/useTheme";

export function DashboardPage() {
    const [currentPage, setCurrentPage] = useState<Page>("overview");
    const [language, setLanguage] = useState<Language>("en");
    const { theme, toggleTheme } = useTheme();

    // TODO: Get user from auth context when available
    const user = null;

    const renderPage = () => {
        switch (currentPage) {
            case "overview":
                return <DashboardOverview language={language} onPageChange={setCurrentPage} />;
            case "transactions":
                return <TransactionsPage language={language} />;
            case "budgeting":
                return <div>Budgeting Page - Coming Soon</div>;
            case "reports":
                return <div>Reports Page - Coming Soon</div>;
            case "settings":
                return <div>Settings Page - Coming Soon</div>;
            default:
                return <DashboardOverview language={language} onPageChange={setCurrentPage} />;
        }
    };

    return (
        <DashboardLayout
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            theme={theme}
            onToggleTheme={toggleTheme}
            language={language}
            user={user}
        >
            {renderPage()}
        </DashboardLayout>
    );
}

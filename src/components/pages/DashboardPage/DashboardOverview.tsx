import { Plus, ArrowLeftRight } from "lucide-react";
import  Button  from "../../atoms/Button/Button";
import { StatsGrid } from "../../organisms/StatsGrid/StatsGrid";
import { CashFlowChart } from "../../organisms/CashFlowChart/CashFlowChart";
import { SpendingChart } from "../../organisms/SpendingChart/SpendingChart";
import { TransactionList } from "../../organisms/TransactionList/TransactionList";
import type { Language, Page } from "../../../types/dashboard.types";
import { useTranslation } from "../../../locales/translations";
import { useDashboard } from "../../../hooks/useDashboard";

interface DashboardOverviewProps {
    language: Language;
    onPageChange: (page: Page) => void;
}

export function DashboardOverview({ language, onPageChange }: DashboardOverviewProps) {
    const t = useTranslation(language);
    const {
        balanceStats,
        cashFlowData,
        categorySpending,
        recentTransactions,
        isLoading,
        error,
    } = useDashboard();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-lg text-muted-foreground">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-lg text-red-600">Error loading dashboard data</div>
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-[1600px] mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold mb-1">{t.title}</h1>
                    <p className="text-muted-foreground">
                        {new Date().toLocaleDateString(
                            language === "en" ? "en-US" : "vi-VN",
                            {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            }
                        )}
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <Button className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                        <Plus className="w-5 h-5 mr-2" />
                        {t.addTransaction}
                    </Button>
                    <Button variant="outline" className="rounded-xl">
                        <ArrowLeftRight className="w-5 h-5 mr-2" />
                        {t.transfer}
                    </Button>
                </div>
            </div>

            {/* Summary Cards */}
            <StatsGrid stats={balanceStats} language={language} />

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <CashFlowChart data={cashFlowData} language={language} />
                <SpendingChart data={categorySpending} language={language} />
            </div>

            {/* Recent Transactions */}
            <TransactionList
                transactions={recentTransactions}
                language={language}
                onViewAll={() => onPageChange("transactions")}
            />
        </div>
    );
}

import { DollarSign, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { StatCard } from "../../molecules/StatCard/StatCard";
import type { BalanceStats, Language } from "../../../types/dashboard.types";
import { useTranslation } from "../../../locales/translations";

interface StatsGridProps {
  stats: BalanceStats | null;
  language: Language;
}

export function StatsGrid({ stats, language }: StatsGridProps) {
  const t = useTranslation(language);

  if (!stats) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title={t.totalBalance}
        value={`$${stats.totalBalance.toLocaleString()}`}
        icon={DollarSign}
        variant="primary"
        trend={{
          value: `${stats.balanceChange}% ${t.changeFromLastMonth}`,
          isPositive: stats.balanceChange > 0,
        }}
      />
      <StatCard
        title={t.income}
        value={`$${stats.income.toLocaleString()}`}
        subtitle={t.thisMonth}
        icon={ArrowUpRight}
        variant="success"
      />
      <StatCard
        title={t.expenses}
        value={`$${stats.expenses.toLocaleString()}`}
        subtitle={t.thisMonth}
        icon={ArrowDownRight}
        variant="danger"
      />
    </div>
  );
}

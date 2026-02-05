import { useState, useEffect } from "react";
import type {
  BalanceStats,
  Transaction,
  CashFlowData,
  CategorySpending,
  User,
} from "../types/dashboard.types";
import { dashboardService } from "../services/dashboard.service";

interface UseDashboardReturn {
  user: User | null;
  balanceStats: BalanceStats | null;
  cashFlowData: CashFlowData[];
  categorySpending: CategorySpending[];
  recentTransactions: Transaction[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useDashboard(): UseDashboardReturn {
  const [user, setUser] = useState<User | null>(null);
  const [balanceStats, setBalanceStats] = useState<BalanceStats | null>(null);
  const [cashFlowData, setCashFlowData] = useState<CashFlowData[]>([]);
  const [categorySpending, setCategorySpending] = useState<CategorySpending[]>([]);
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [
        // userProfile,
        balance,
        cashFlow,
        spending,
        transactions,
      ] = await Promise.all([
        // dashboardService.getUserProfile(),
        dashboardService.getBalanceStats(),
        dashboardService.getCashFlowData(),
        dashboardService.getCategorySpending(),
        dashboardService.getRecentTransactions(),
      ]);

      // setUser(userProfile);
      setBalanceStats(balance);
      setCashFlowData(cashFlow);
      setCategorySpending(spending);
      setRecentTransactions(transactions);
    } catch (err) {
      setError(err as Error);
      console.error("Error fetching dashboard data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return {
    user,
    balanceStats,
    cashFlowData,
    categorySpending,
    recentTransactions,
    isLoading,
    error,
    refetch: fetchDashboardData,
  };
}

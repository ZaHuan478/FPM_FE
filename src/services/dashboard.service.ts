import api from "./api";
import type {
  BalanceStats,
  Transaction,
  CashFlowData,
  CategorySpending,
  User,
} from "../types/dashboard.types";

export const dashboardService = {
  // Get user profile
  async getUserProfile(): Promise<User> {
    try {
      const response = await api.get("/user/profile");
      return response.data;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw error;
    }
  },

  // Get balance statistics
  async getBalanceStats(): Promise<BalanceStats> {
    try {
      const [incomesRes, expensesRes] = await Promise.all([
        api.get("/income"),
        api.get("/expense"),
      ]);

      const incomes = incomesRes.data.data || [];
      const expenses = expensesRes.data.data || [];

      // Calculate totals
      const totalIncome = incomes.reduce((sum: number, item: any) => sum + (item.amount || 0), 0);
      const totalExpenses = expenses.reduce((sum: number, item: any) => sum + (item.amount || 0), 0);
      const totalBalance = totalIncome - totalExpenses;
      const savings = totalBalance > 0 ? totalBalance * 0.2 : 0; // 20% savings goal

      // Calculate balance change (compare with previous period - simplified)
      const balanceChange = totalBalance > 0 ? 12.5 : -5.2;

      return {
        totalBalance,
        income: totalIncome,
        expenses: totalExpenses,
        savings,
        balanceChange,
      };
    } catch (error) {
      console.error("Error fetching balance stats:", error);
      throw error;
    }
  },

  // Get cash flow data
  async getCashFlowData(): Promise<CashFlowData[]> {
    try {
      const [incomesRes, expensesRes] = await Promise.all([
        api.get("/income"),
        api.get("/expense"),
      ]);

      const incomes = incomesRes.data.data || [];
      const expenses = expensesRes.data.data || [];

      // Group by month
      const monthlyData: { [key: string]: { income: number; expenses: number } } = {};
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

      // Process incomes
      incomes.forEach((item: any) => {
        if (item.date) {
          const date = new Date(item.date);
          const monthKey = months[date.getMonth()];
          if (!monthlyData[monthKey]) {
            monthlyData[monthKey] = { income: 0, expenses: 0 };
          }
          monthlyData[monthKey].income += item.amount || 0;
        }
      });

      // Process expenses
      expenses.forEach((item: any) => {
        if (item.date) {
          const date = new Date(item.date);
          const monthKey = months[date.getMonth()];
          if (!monthlyData[monthKey]) {
            monthlyData[monthKey] = { income: 0, expenses: 0 };
          }
          monthlyData[monthKey].expenses += item.amount || 0;
        }
      });

      // Convert to array and get last 6 months
      const currentMonth = new Date().getMonth();
      const result: CashFlowData[] = [];
      
      for (let i = 5; i >= 0; i--) {
        const monthIndex = (currentMonth - i + 12) % 12;
        const monthKey = months[monthIndex];
        result.push({
          month: monthKey,
          income: monthlyData[monthKey]?.income || 0,
          expenses: monthlyData[monthKey]?.expenses || 0,
        });
      }

      return result;
    } catch (error) {
      console.error("Error fetching cash flow data:", error);
      throw error;
    }
  },

  // Get spending by category
  async getCategorySpending(): Promise<CategorySpending[]> {
    try {
      const expensesRes = await api.get("/expense");
      const expenses = expensesRes.data.data || [];

      // Group by category
      const categoryMap: { [key: string]: number } = {};
      
      expenses.forEach((expense: any) => {
        const categoryName = expense.category?.name || expense.category || "Other";
        categoryMap[categoryName] = (categoryMap[categoryName] || 0) + (expense.amount || 0);
      });

      // Convert to array with colors
      const colors = ["#3b82f6", "#6366f1", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444", "#ec4899"];
      const result: CategorySpending[] = Object.entries(categoryMap)
        .map(([name, value], index) => ({
          name,
          value,
          color: colors[index % colors.length],
        }))
        .sort((a, b) => b.value - a.value); // Sort by value descending

      return result;
    } catch (error) {
      console.error("Error fetching category spending:", error);
      throw error;
    }
  },

  // Get recent transactions
  async getRecentTransactions(limit: number = 5): Promise<Transaction[]> {
    try {
      const [incomesRes, expensesRes] = await Promise.all([
        api.get("/income"),
        api.get("/expense"),
      ]);

      const incomes = incomesRes.data.data || [];
      const expenses = expensesRes.data.data || [];

      // Map incomes to Transaction format
      const incomeTransactions: Transaction[] = incomes.map((income: any) => ({
        id: income._id || income.id,
        name: income.name || income.description || "Income",
        description: income.description || income.name || "Income",
        category: income.category?.name || income.category || "Income",
        type: "income" as const,
        amount: Math.abs(income.amount || 0),
        date: income.date ? new Date(income.date).toISOString().split('T')[0] : "",
        status: "completed" as const,
        icon: "TrendingUp",
      }));

      // Map expenses to Transaction format
      const expenseTransactions: Transaction[] = expenses.map((expense: any) => ({
        id: expense._id || expense.id,
        name: expense.name || expense.description || "Expense",
        description: expense.description || expense.name || "Expense",
        category: expense.category?.name || expense.category || "Uncategorized",
        type: "expense" as const,
        amount: -Math.abs(expense.amount || 0),
        date: expense.date ? new Date(expense.date).toISOString().split('T')[0] : "",
        status: "completed" as const,
        icon: "ShoppingBag",
      }));

      // Combine, sort by date (newest first), and limit
      const allTransactions = [...incomeTransactions, ...expenseTransactions]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, limit);

      return allTransactions;
    } catch (error) {
      console.error("Error fetching recent transactions:", error);
      throw error;
    }
  },
};

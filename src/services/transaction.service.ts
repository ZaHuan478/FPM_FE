import api from "./api";
import type {
  Transaction,
  TransactionFilters,
  PaginationParams,
  PaginatedResponse,
} from "../types/dashboard.types";

export const transactionService = {
  // Get all transactions with filters and pagination
  async getTransactions(
    filters?: Partial<TransactionFilters>,
    pagination?: PaginationParams
  ): Promise<PaginatedResponse<Transaction>> {
    try {
      // Fetch both expenses and incomes from backend
      const [expensesRes, incomesRes] = await Promise.all([
        api.get("/expense"),
        api.get("/income"),
      ]);

      // Map expenses to Transaction format
      const expenses: Transaction[] = (expensesRes.data.data || []).map((expense: any) => ({
        id: expense._id || expense.id,
        name: expense.name || expense.description,
        description: expense.description || expense.name,
        category: expense.category?.name || expense.category || "Uncategorized",
        type: "expense" as const,
        amount: -Math.abs(expense.amount),
        date: expense.date ? new Date(expense.date).toISOString().split('T')[0] : "",
        status: "completed" as const,
        icon: "ShoppingBag",
      }));

      // Map incomes to Transaction format
      const incomes: Transaction[] = (incomesRes.data.data || []).map((income: any) => ({
        id: income._id || income.id,
        name: income.name || income.description,
        description: income.description || income.name,
        category: income.category?.name || income.category || "Income",
        type: "income" as const,
        amount: Math.abs(income.amount),
        date: income.date ? new Date(income.date).toISOString().split('T')[0] : "",
        status: "completed" as const,
        icon: "TrendingUp",
      }));

      // Combine and sort by date (newest first)
      let allTransactions = [...expenses, ...incomes].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      // Apply filters
      if (filters?.search) {
        allTransactions = allTransactions.filter(
          (t) =>
            t.description.toLowerCase().includes(filters.search!.toLowerCase()) ||
            t.category.toLowerCase().includes(filters.search!.toLowerCase())
        );
      }
      if (filters?.category && filters.category !== "all") {
        allTransactions = allTransactions.filter((t) => t.category === filters.category);
      }
      if (filters?.type && filters.type !== "all") {
        allTransactions = allTransactions.filter((t) => t.type === filters.type);
      }

      // Apply pagination
      const page = pagination?.page || 1;
      const limit = pagination?.limit || 10;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedData = allTransactions.slice(startIndex, endIndex);

      return {
        data: paginatedData,
        total: allTransactions.length,
        page,
        totalPages: Math.ceil(allTransactions.length / limit),
      };
    } catch (error) {
      console.error("Error fetching transactions:", error);
      throw error;
    }
  },

  // Get single transaction by ID
  async getTransaction(id: string): Promise<Transaction> {
    try {
      // Try to get from expenses first, then incomes
      try {
        const response = await api.get(`/expense/${id}`);
        const expense = response.data.data;
        return {
          id: expense._id || expense.id,
          name: expense.name || expense.description,
          description: expense.description || expense.name,
          category: expense.category?.name || expense.category || "Uncategorized",
          type: "expense",
          amount: -Math.abs(expense.amount),
          date: expense.date ? new Date(expense.date).toISOString().split('T')[0] : "",
          status: "completed",
          icon: "ShoppingBag",
        };
      } catch {
        const response = await api.get(`/income/${id}`);
        const income = response.data.data;
        return {
          id: income._id || income.id,
          name: income.name || income.description,
          description: income.description || income.name,
          category: income.category?.name || income.category || "Income",
          type: "income",
          amount: Math.abs(income.amount),
          date: income.date ? new Date(income.date).toISOString().split('T')[0] : "",
          status: "completed",
          icon: "TrendingUp",
        };
      }
    } catch (error) {
      console.error("Error fetching transaction:", error);
      throw error;
    }
  },

  // Create new transaction
  async createTransaction(data: Omit<Transaction, "id">): Promise<Transaction> {
    try {
      const endpoint = data.type === "expense" ? "/expense" : "/income";
      const payload = {
        name: data.name,
        description: data.description,
        category: data.category,
        amount: Math.abs(data.amount),
        date: data.date,
      };

      const response = await api.post(endpoint, payload);
      const created = response.data.data;

      return {
        id: created._id || created.id,
        name: created.name || created.description,
        description: created.description || created.name,
        category: created.category?.name || created.category || "Uncategorized",
        type: data.type,
        amount: data.type === "expense" ? -Math.abs(created.amount) : Math.abs(created.amount),
        date: created.date ? new Date(created.date).toISOString().split('T')[0] : "",
        status: "completed",
        icon: data.type === "expense" ? "ShoppingBag" : "TrendingUp",
      };
    } catch (error) {
      console.error("Error creating transaction:", error);
      throw error;
    }
  },

  // Update transaction
  async updateTransaction(id: string, data: Partial<Transaction>): Promise<Transaction> {
    try {
      const endpoint = data.type === "expense" ? `/expense/${id}` : `/income/${id}`;
      const payload: any = {};

      if (data.name) payload.name = data.name;
      if (data.description) payload.description = data.description;
      if (data.category) payload.category = data.category;
      if (data.amount !== undefined) payload.amount = Math.abs(data.amount);
      if (data.date) payload.date = data.date;

      const response = await api.put(endpoint, payload);
      const updated = response.data.data;

      return {
        id: updated._id || updated.id,
        name: updated.name || updated.description,
        description: updated.description || updated.name,
        category: updated.category?.name || updated.category || "Uncategorized",
        type: data.type || "expense",
        amount: data.type === "expense" ? -Math.abs(updated.amount) : Math.abs(updated.amount),
        date: updated.date ? new Date(updated.date).toISOString().split('T')[0] : "",
        status: "completed",
        icon: data.type === "expense" ? "ShoppingBag" : "TrendingUp",
      };
    } catch (error) {
      console.error("Error updating transaction:", error);
      throw error;
    }
  },

  // Delete transaction
  async deleteTransaction(id: string): Promise<void> {
    try {
      // Try to delete from expenses first, then incomes
      try {
        await api.delete(`/expense/${id}`);
      } catch {
        await api.delete(`/income/${id}`);
      }
    } catch (error) {
      console.error("Error deleting transaction:", error);
      throw error;
    }
  },

  // Get categories
  async getCategories(): Promise<string[]> {
    try {
      const response = await api.get("/category");
      const categories = response.data.data || [];
      return categories.map((cat: any) => cat.name || cat);
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  },

  // Export transactions
  async exportTransactions(filters?: Partial<TransactionFilters>): Promise<Blob> {
    try {
      // TODO: Implement API call when backend is ready
      // const response = await api.get("/transactions/export", {
      //   params: filters,
      //   responseType: "blob",
      // });
      // return response.data;

      throw new Error("Not implemented");
    } catch (error) {
      console.error("Error exporting transactions:", error);
      throw error;
    }
  },
};

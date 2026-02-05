import { useState, useEffect, useCallback } from "react";
import type {
  Transaction,
  TransactionFilters,
  PaginationParams,
  PaginatedResponse,
} from "../types/dashboard.types";
import { transactionService } from "../services/transaction.service";

interface UseTransactionsReturn {
  transactions: Transaction[];
  isLoading: boolean;
  error: Error | null;
  pagination: {
    total: number;
    page: number;
    totalPages: number;
  };
  filters: Partial<TransactionFilters>;
  setFilters: (filters: Partial<TransactionFilters>) => void;
  setPage: (page: number) => void;
  refetch: () => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
}

export function useTransactions(initialLimit = 50): UseTransactionsReturn {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [filters, setFilters] = useState<Partial<TransactionFilters>>({
    search: "",
    category: "all",
    type: "all",
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: initialLimit,
    total: 0,
    totalPages: 0,
  });

  const fetchTransactions = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await transactionService.getTransactions(filters, {
        page: pagination.page,
        limit: pagination.limit,
      });

      setTransactions(response.data);
      setPagination((prev) => ({
        ...prev,
        total: response.total,
        totalPages: response.totalPages,
      }));
    } catch (err) {
      setError(err as Error);
      console.error("Error fetching transactions:", err);
    } finally {
      setIsLoading(false);
    }
  }, [filters, pagination.page, pagination.limit]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const handleSetFilters = (newFilters: Partial<TransactionFilters>) => {
    setFilters(newFilters);
    setPagination((prev) => ({ ...prev, page: 1 })); // Reset to first page
  };

  const setPage = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  };

  const deleteTransaction = async (id: string) => {
    try {
      await transactionService.deleteTransaction(id);
      await fetchTransactions();
    } catch (err) {
      console.error("Error deleting transaction:", err);
      throw err;
    }
  };

  return {
    transactions,
    isLoading,
    error,
    pagination: {
      total: pagination.total,
      page: pagination.page,
      totalPages: pagination.totalPages,
    },
    filters,
    setFilters: handleSetFilters,
    setPage,
    refetch: fetchTransactions,
    deleteTransaction,
  };
}

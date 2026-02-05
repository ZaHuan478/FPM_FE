import { useState, useEffect } from "react";
import { FilterBar } from "../../molecules/FilterBar/FilterBar";
import { TransactionTable } from "../../organisms/TransactionTable/TransactionTable";
import type { Language, Transaction } from "../../../types/dashboard.types";
import { useTransactions } from "../../../hooks/useTransactions";
import { useTranslation } from "../../../locales/translations";
import { transactionService } from "../../../services/transaction.service";

interface TransactionsPageProps {
  language: Language;
}

export function TransactionsPage({ language }: TransactionsPageProps) {
  const t = useTranslation(language);
  const [categories, setCategories] = useState<string[]>([]);
  const {
    transactions,
    isLoading,
    filters,
    setFilters,
    refetch,
    deleteTransaction,
  } = useTransactions();

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const cats = await transactionService.getCategories();
        setCategories(cats);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleEdit = (transaction: Transaction) => {
    // TODO: Open edit modal/drawer
    console.log("Edit transaction:", transaction);
  };

  const handleDelete = async (id: string) => {
    try {
      // TODO: Show confirmation dialog
      if (window.confirm("Are you sure you want to delete this transaction?")) {
        await deleteTransaction(id);
      }
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  const handleExport = async () => {
    try {
      // TODO: Implement export functionality
      console.log("Export transactions with filters:", filters);
      // const blob = await transactionService.exportTransactions(filters);
      // // Create download link
      // const url = window.URL.createObjectURL(blob);
      // const a = document.createElement("a");
      // a.href = url;
      // a.download = `transactions-${new Date().toISOString()}.csv`;
      // document.body.appendChild(a);
      // a.click();
      // window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting transactions:", error);
    }
  };

  const handleAddNew = () => {
    // TODO: Open add transaction modal/drawer
    console.log("Add new transaction");
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-1">{t.transactionsTitle}</h1>
        <p className="text-muted-foreground">{t.transactionsSubtitle}</p>
      </div>

      {/* Filters */}
      <FilterBar
        filters={filters}
        onFiltersChange={setFilters}
        categories={categories}
        onExport={handleExport}
        onAddNew={handleAddNew}
        language={language}
        translations={{
          searchTransactions: t.searchTransactions,
          allCategories: t.allCategories,
          allTypes: t.allTypes,
          income: t.income,
          expense: t.expenses,
          export: t.export,
          addTransaction: t.addTransaction,
        }}
      />

      {/* Transactions Table */}
      <TransactionTable
        transactions={transactions}
        onEdit={handleEdit}
        onDelete={handleDelete}
        language={language}
        isLoading={isLoading}
        translations={{
          date: t.date,
          description: t.description,
          category: t.category,
          amount: t.totalBalance,
          status: t.status,
          actions: t.actions,
          completed: t.completed,
          pending: t.pending,
          edit: t.edit,
          delete: t.delete,
        }}
      />
    </div>
  );
}

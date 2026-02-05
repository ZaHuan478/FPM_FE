export type Page = "overview" | "transactions" | "budgeting" | "reports" | "settings";

export type Language = "en" | "vi";

export type Theme = "light" | "dark";

export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export type BalanceStats = {
  totalBalance: number;
  income: number;
  expenses: number;
  savings: number;
  balanceChange: number;
}

export type Transaction = {
  id: string;
  name: string;
  description: string;
  category: string;
  amount: number;
  date: string;
  type: "income" | "expense";
  status: "completed" | "pending";
  icon?: string;
}

export type TransactionFilters = {
  search: string;
  category: string;
  type: "all" | "income" | "expense";
  dateFrom?: string;
  dateTo?: string;
}

export type PaginationParams = {
  page: number;
  limit: number;
}

export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
}

export type CashFlowData = {
  month: string;
  income: number;
  expenses: number;
}

export type CategorySpending = {
  name: string;
  value: number;
  color: string;
}

export type NavItem = {
  id: Page;
  label: string;
  icon: any;
}

import type { Language } from "../types/dashboard.types";

export const translations = {
  en: {
    // Navigation
    overview: "Overview",
    transactions: "Transactions",
    budgeting: "Budgeting",
    reports: "Reports",
    settings: "Settings",
    
    // Header
    search: "Search...",
    profile: "Profile",
    logout: "Logout",
    theme: "Theme",
    status: "Status",
    category: "Category",
    
    // Dashboard
    title: "Dashboard Overview",
    totalBalance: "Total Balance",
    income: "Income",
    expenses: "Expenses",
    savings: "Savings",
    cashFlow: "Cash Flow",
    thisMonth: "This Month",
    spending: "Spending by Category",
    recentTransactions: "Recent Transactions",
    addTransaction: "Add Transaction",
    transfer: "Transfer",
    viewAll: "View All",
    lastMonths: "Last 6 months",
    changeFromLastMonth: "from last month",
    
    // Transactions
    transactionsTitle: "Transactions",
    transactionsSubtitle: "View and manage all your transactions",
    searchTransactions: "Search transactions...",
    allCategories: "All Categories",
    allTypes: "All Types",
    export: "Export",
    date: "Date",
    description: "Description",
    actions: "Actions",
    completed: "Completed",
    pending: "Pending",
    edit: "Edit",
    delete: "Delete",
  },
  vi: {
    // Navigation
    overview: "Tổng quan",
    transactions: "Giao dịch",
    budgeting: "Ngân sách",
    reports: "Báo cáo",
    settings: "Cài đặt",
    
    // Header
    search: "Tìm kiếm...",
    profile: "Hồ sơ",
    logout: "Đăng xuất",
    theme: "Giao diện",
    status: "Trạng thái",
    category: "Danh mục",
    
    // Dashboard
    title: "Tổng quan",
    totalBalance: "Tổng số dư",
    income: "Thu nhập",
    expenses: "Chi phí",
    savings: "Tiết kiệm",
    cashFlow: "Dòng tiền",
    thisMonth: "Tháng này",
    spending: "Chi tiêu theo danh mục",
    recentTransactions: "Giao dịch gần đây",
    addTransaction: "Thêm giao dịch",
    transfer: "Chuyển khoản",
    viewAll: "Xem tất cả",
    lastMonths: "6 tháng gần đây",
    changeFromLastMonth: "so với tháng trước",
    
    // Transactions
    transactionsTitle: "Giao dịch",
    transactionsSubtitle: "Xem và quản lý tất cả giao dịch của bạn",
    searchTransactions: "Tìm kiếm giao dịch...",
    allCategories: "Tất cả danh mục",
    allTypes: "Tất cả loại",
    export: "Xuất",
    date: "Ngày",
    description: "Mô tả",
    actions: "Hành động",
    completed: "Hoàn thành",
    pending: "Đang chờ",
    edit: "Chỉnh sửa",
    delete: "Xóa",
  },
};

export const useTranslation = (language: Language) => {
  return translations[language];
};

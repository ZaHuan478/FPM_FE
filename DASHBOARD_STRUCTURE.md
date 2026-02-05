# Dashboard Structure - Atomic Design

## Cấu trúc đã tạo theo Atomic Design Pattern

### 📁 Atoms (Thành phần cơ bản nhất)
- `Avatar/Avatar.tsx` - Component hiển thị avatar người dùng
- `Badge/Badge.tsx` - Component hiển thị badge/nhãn
- `Button/Button.tsx` - Component nút bấm (đã có sẵn)
- `Card/Card.tsx` - Component thẻ/card (đã có sẵn)
- `Input/Input.tsx` - Component input (đã có sẵn)
- `Label/Label.tsx` - Component nhãn (đã có sẵn)
- `Separator/Separator.tsx` - Component ngăn cách (đã có sẵn)
- `DropdownMenu/DropdownMenu.tsx` - Component dropdown menu

### 📁 Molecules (Kết hợp các atoms)
- `StatCard/StatCard.tsx` - Card hiển thị thống kê (income, expenses, balance)
- `TransactionItem/TransactionItem.tsx` - Item hiển thị một giao dịch
- `CategoryItem/CategoryItem.tsx` - Item hiển thị một category với màu sắc
- `NavItem/NavItem.tsx` - Item điều hướng trong sidebar
- `UserProfile/UserProfile.tsx` - Hiển thị thông tin user profile
- `FormInput/FormInput.tsx` - Input có label (đã có sẵn)

### 📁 Organisms (Kết hợp molecules và atoms thành sections)
- `Sidebar/Sidebar.tsx` - Thanh điều hướng bên trái
- `Header/Header.tsx` - Header chứa search, notifications, user menu
- `StatsGrid/StatsGrid.tsx` - Grid hiển thị các thống kê (balance, income, expenses)
- `CashFlowChart/CashFlowChart.tsx` - Biểu đồ dòng tiền theo tháng
- `SpendingChart/SpendingChart.tsx` - Biểu đồ chi tiêu theo category
- `TransactionList/TransactionList.tsx` - Danh sách giao dịch gần đây

### 📁 Templates (Layout structures)
- `DashboardLayout/DashboardLayout.tsx` - Layout chính cho dashboard với sidebar và header
- `AuthLayout/AuthLayout.tsx` - Layout cho trang login/register (đã có sẵn)

### 📁 Pages (Trang hoàn chỉnh)
- `DashboardPage/DashboardPage.tsx` - Trang dashboard chính
- `DashboardPage/DashboardOverview.tsx` - Nội dung trang overview
- `LoginPage/LoginPage.tsx` - Trang đăng nhập (đã có sẵn)
- `RegisterPage/RegisterPage.tsx` - Trang đăng ký (đã có sẵn)

## 🔧 Services & Hooks

### Services
- `dashboard.service.ts` - Service xử lý API calls cho dashboard
  - `getUserProfile()` - Lấy thông tin user (TODO)
  - `getBalanceStats()` - Lấy thống kê số dư (mock data)
  - `getCashFlowData()` - Lấy dữ liệu dòng tiền (mock data)
  - `getCategorySpending()` - Lấy chi tiêu theo category (mock data)
  - `getRecentTransactions()` - Lấy giao dịch gần đây (mock data)

### Custom Hooks
- `useDashboard.ts` - Hook quản lý state và fetch data cho dashboard
- `useTheme.ts` - Hook quản lý theme (light/dark mode)

## 📦 Types & Utilities

### Types
- `dashboard.types.ts` - Định nghĩa tất cả types cho dashboard
  - `Page`, `Language`, `Theme`
  - `User`, `BalanceStats`, `Transaction`
  - `CashFlowData`, `CategorySpending`, `NavItem`

### Localization
- `locales/translations.ts` - Quản lý đa ngôn ngữ (EN/VI)
  - Export `translations` object
  - Export `useTranslation` hook

### Utilities
- `lib/utils.ts` - Utility functions (cn helper)

## 🎯 Cách sử dụng

### Import DashboardPage vào App:
```tsx
import { DashboardPage } from "@/components/pages/DashboardPage/DashboardPage";

function App() {
  return <DashboardPage />;
}
```

### Các API đã được chuẩn bị:
- Tất cả API calls đã được define trong `dashboard.service.ts`
- Hiện tại sử dụng mock data
- Khi backend ready, chỉ cần uncomment API calls và xóa mock data

### Thêm page mới:
1. Tạo component trong `components/pages/`
2. Thêm page type vào `dashboard.types.ts`
3. Thêm nav item vào `DashboardLayout`
4. Thêm case vào switch trong `DashboardPage`

## ✅ Đã loại bỏ hardcode:
- ✅ User data - sẽ fetch từ API
- ✅ Balance stats - mock data, ready cho API
- ✅ Cash flow data - mock data, ready cho API
- ✅ Category spending - mock data, ready cho API
- ✅ Recent transactions - mock data, ready cho API
- ✅ Translations - tách riêng vào file translations.ts
- ✅ Theme - managed by useTheme hook với localStorage

## 🚀 Next Steps:
1. Implement backend APIs
2. Tạo các pages còn lại (Transactions, Budgeting, Reports, Settings)
3. Add authentication context
4. Add error handling UI
5. Add loading skeletons
6. Add pagination cho transactions

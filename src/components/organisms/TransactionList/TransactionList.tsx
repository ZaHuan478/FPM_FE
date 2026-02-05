import { Card, CardContent, CardHeader, CardTitle } from "../../atoms/Card/Card";
import  Button  from "../../atoms/Button/Button";
import { TransactionItem } from "../../molecules/TransactionItem/TransactionItem";
import type { Transaction, Language } from "../../../types/dashboard.types";
import { useTranslation } from "../../../locales/translations";
import {
  ShoppingBag,
  TrendingUp,
  Home,
  Coffee,
  Car,
} from "lucide-react";

interface TransactionListProps {
  transactions: Transaction[];
  language: Language;
  onViewAll: () => void;
}

const iconMap: Record<string, any> = {
  Shopping: ShoppingBag,
  Income: TrendingUp,
  Housing: Home,
  "Food & Drink": Coffee,
  Transport: Car,
};

export function TransactionList({ transactions, language, onViewAll }: TransactionListProps) {
  const t = useTranslation(language);

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{t.recentTransactions}</CardTitle>
          <Button variant="outline" className="rounded-xl" onClick={onViewAll}>
            {t.viewAll}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No transactions found
            </p>
          ) : (
            transactions.map((transaction) => (
              <TransactionItem
                key={transaction.id}
                name={transaction.name}
                category={transaction.category}
                amount={transaction.amount}
                date={transaction.date}
                icon={iconMap[transaction.category] || ShoppingBag}
              />
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}

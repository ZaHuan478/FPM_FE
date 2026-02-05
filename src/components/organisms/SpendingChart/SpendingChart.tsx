import { Card, CardContent, CardHeader, CardTitle } from "../../atoms/Card/Card";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { CategoryItem } from "../../molecules/CategoryItem/CategoryItem";
import type { CategorySpending, Language } from "../../../types/dashboard.types";
import { useTranslation } from "../../../locales/translations";

interface SpendingChartProps {
  data: CategorySpending[];
  language: Language;
}

export function SpendingChart({ data, language }: SpendingChartProps) {
  const t = useTranslation(language);

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle>{t.spending}</CardTitle>
        <p className="text-sm text-muted-foreground">{t.thisMonth}</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-4 space-y-2">
          {data.map((item) => (
            <CategoryItem key={item.name} name={item.name} value={item.value} color={item.color} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

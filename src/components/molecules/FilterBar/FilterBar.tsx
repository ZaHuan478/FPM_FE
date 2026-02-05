import { Search, Download, Plus, Filter } from "lucide-react";
import { Card, CardContent } from "../../atoms/Card/Card";
import Button from "../../atoms/Button/Button";
import Input from "../../atoms/Input/Input";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../../components/atoms/Select/Select";
import type { TransactionFilters, Language } from "../../../types/dashboard.types";

interface FilterBarProps {
    filters: Partial<TransactionFilters>;
    onFiltersChange: (filters: Partial<TransactionFilters>) => void;
    categories: string[];
    onExport?: () => void;
    onAddNew?: () => void;
    language: Language;
    translations: {
        searchTransactions: string;
        allCategories: string;
        allTypes: string;
        income: string;
        expense: string;
        export: string;
        addTransaction: string;
    };
}

export function FilterBar({
    filters,
    onFiltersChange,
    categories,
    onExport,
    onAddNew,
    translations: t,
}: FilterBarProps) {
    const handleSearchChange = (value: string) => {
        onFiltersChange({ ...filters, search: value });
    };

    const handleCategoryChange = (value: string) => {
        onFiltersChange({ ...filters, category: value });
    };

    const handleTypeChange = (value: string) => {
        onFiltersChange({ ...filters, type: value as "all" | "income" | "expense" });
    };

    return (
        <Card className="border-0 shadow-lg">
            <CardContent className="pt-6">
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                            placeholder={t.searchTransactions}
                            value={filters.search || ""}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            className="pl-10 rounded-xl"
                        />
                    </div>

                    <div className="flex gap-3">
                        <Select value={filters.category || "all"} onValueChange={handleCategoryChange}>
                            <SelectTrigger className="w-[180px] rounded-xl">
                                <SelectValue placeholder={t.allCategories} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">{t.allCategories}</SelectItem>
                                {categories.map((category) => (
                                    <SelectItem key={category} value={category}>
                                        {category}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select value={filters.type || "all"} onValueChange={handleTypeChange}>
                            <SelectTrigger className="w-[150px] rounded-xl">
                                <SelectValue placeholder={t.allTypes} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">{t.allTypes}</SelectItem>
                                <SelectItem value="income">{t.income}</SelectItem>
                                <SelectItem value="expense">{t.expense}</SelectItem>
                            </SelectContent>
                        </Select>

                        {onExport && (
                            <Button variant="outline" className="rounded-xl" onClick={onExport}>
                                <Download className="w-4 h-4 mr-2" />
                                {t.export}
                            </Button>
                        )}

                        {onAddNew && (
                            <Button
                                className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                                onClick={onAddNew}
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                {t.addTransaction}
                            </Button>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

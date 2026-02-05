import { Badge } from "../../atoms/Badge/Badge";
import Button from "../../atoms/Button/Button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../../atoms/DropdownMenu/DropdownMenu";
import { TableCell, TableRow } from "../../atoms/Table/Table";
import type { Transaction } from "../../../types/dashboard.types";
import {
    ShoppingBag,
    TrendingUp,
    Home,
    Coffee,
    Car,
    Wallet,
    MoreVertical,
} from "lucide-react";

interface TransactionRowProps {
    transaction: Transaction;
    onEdit?: (transaction: Transaction) => void;
    onDelete?: (id: string) => void;
    editLabel: string;
    deleteLabel: string;
    completedLabel: string;
    pendingLabel: string;
}

const iconMap: Record<string, any> = {
    ShoppingBag,
    TrendingUp,
    Home,
    Coffee,
    Car,
    Wallet,
};

export function TransactionRow({
    transaction,
    onEdit,
    onDelete,
    editLabel,
    deleteLabel,
    completedLabel,
    pendingLabel,
}: TransactionRowProps) {
    const Icon = iconMap[transaction.icon || "ShoppingBag"] || ShoppingBag;
    const isPositive = transaction.amount > 0;

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    return (
        <TableRow className="group">
            <TableCell>
                <span className="text-muted-foreground">{formatDate(transaction.date)}</span>
            </TableCell>
            <TableCell>
                <div className="flex items-center gap-3">
                    <div
                        className={`p-2 rounded-lg ${isPositive
                                ? "bg-green-100 dark:bg-green-900/30"
                                : "bg-slate-100 dark:bg-slate-800"
                            }`}
                    >
                        <Icon
                            className={`w-4 h-4 ${isPositive
                                    ? "text-green-600 dark:text-green-400"
                                    : "text-slate-600 dark:text-slate-400"
                                }`}
                        />
                    </div>
                    <span className="font-medium">{transaction.description}</span>
                </div>
            </TableCell>
            <TableCell>
                <Badge variant="secondary" className="rounded-lg">
                    {transaction.category}
                </Badge>
            </TableCell>
            <TableCell>
                <span
                    className={`font-medium ${isPositive ? "text-green-600 dark:text-green-400" : "text-foreground"
                        }`}
                >
                    {isPositive ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
                </span>
            </TableCell>
            <TableCell>
                <Badge
                    variant={transaction.status === "completed" ? "default" : "secondary"}
                    className={`rounded-lg ${transaction.status === "completed"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                        }`}
                >
                    {transaction.status === "completed" ? completedLabel : pendingLabel}
                </Badge>
            </TableCell>
            <TableCell className="text-right">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <MoreVertical className="w-4 h-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEdit?.(transaction)}>
                            {editLabel}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => onDelete?.(transaction.id)}
                        >
                            {deleteLabel}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow>
    );
}

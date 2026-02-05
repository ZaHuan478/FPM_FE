import { Card, CardContent } from "../../atoms/Card/Card";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "../../atoms/Table/Table";
import { TransactionRow } from "../../molecules/TransactionRow/TransactionRow";
import type { Transaction, Language } from "../../../types/dashboard.types";

interface TransactionTableProps {
    transactions: Transaction[];
    onEdit?: (transaction: Transaction) => void;
    onDelete?: (id: string) => void;
    language: Language;
    isLoading?: boolean;
    translations: {
        date: string;
        description: string;
        category: string;
        amount: string;
        status: string;
        actions: string;
        completed: string;
        pending: string;
        edit: string;
        delete: string;
    };
}

export function TransactionTable({
    transactions,
    onEdit,
    onDelete,
    translations: t,
    isLoading = false,
}: TransactionTableProps) {
    if (isLoading) {
        return (
            <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                    <div className="flex items-center justify-center">
                        <div className="text-muted-foreground">Loading transactions...</div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (transactions.length === 0) {
        return (
            <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                    <div className="flex items-center justify-center">
                        <div className="text-muted-foreground">No transactions found</div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="border-0 shadow-lg">
            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent">
                            <TableHead className="rounded-tl-xl">{t.date}</TableHead>
                            <TableHead>{t.description}</TableHead>
                            <TableHead>{t.category}</TableHead>
                            <TableHead>{t.amount}</TableHead>
                            <TableHead>{t.status}</TableHead>
                            <TableHead className="rounded-tr-xl text-right">{t.actions}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {transactions.map((transaction) => (
                            <TransactionRow
                                key={transaction.id}
                                transaction={transaction}
                                onEdit={onEdit}
                                onDelete={onDelete}
                                editLabel={t.edit}
                                deleteLabel={t.delete}
                                completedLabel={t.completed}
                                pendingLabel={t.pending}
                            />
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

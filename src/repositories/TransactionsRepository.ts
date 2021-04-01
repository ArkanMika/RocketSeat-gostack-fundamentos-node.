import Transaction from '../models/Transaction';

interface Balance {
    income: number;
    outcome: number;
    total: number;
}

interface CreateTransactionDTO {
    title: string;

    value: number;

    type: 'income' | 'outcome';
}

class TransactionsRepository {
    private transactions: Transaction[];

    constructor() {
        this.transactions = [];
    }

    public all(): Transaction[] {
        return this.transactions;
    }

    public getBalance(): Balance {
        const { income, outcome } = this.transactions.reduce(
            (acc: Balance, cur: Transaction) => {
                switch (cur.type) {
                    case 'income': {
                        acc.income += cur.value;
                        break;
                    }
                    case 'outcome': {
                        acc.outcome += cur.value;
                        break;
                    }
                    default: {
                        break;
                    }
                }
                return acc;
            },
            {
                income: 0,
                outcome: 0,
                total: 0,
            },
        );

        const balance: Balance = {
            income,
            outcome,
            total: income - outcome,
        };

        return balance;
    }

    public create({ title, value, type }: CreateTransactionDTO): Transaction {
        const transaction = new Transaction({ title, value, type });

        this.transactions.push(transaction);

        return transaction;
    }
}

export default TransactionsRepository;

import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
    title: string;
    value: number;
    type: 'income' | 'outcome';
}

class CreateTransactionService {
    private transactionsRepository: TransactionsRepository;

    constructor(transactionsRepository: TransactionsRepository) {
        this.transactionsRepository = transactionsRepository;
    }

    public execute({ title, value, type }: Request): Transaction {
        const { total } = this.transactionsRepository.getBalance();

        if (type === 'outcome' && value > total) {
            throw Error('Saldo insuficiente');
        }

        const transaction = new Transaction({
            title,
            value,
            type,
        });

        const transactionCompleted = this.transactionsRepository.create(
            transaction,
        );

        return transactionCompleted;
    }
}

export default CreateTransactionService;

import React, { useState, useEffect } from 'react';
import Pagination from '@material-ui/lab/Pagination';

import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import total from '../../assets/total.svg';

import api from '../../services/api';

import Header from '../../components/Header';

import formatValue from '../../utils/formatValue';
import formatDate from '../../utils/formatDate';

import {
  Container,
  CardContainer,
  Card,
  TableContainer,
  PaginationContainer,
} from './styles';

interface Transaction {
  id: string;
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: { title: string };
  created_at: Date;
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface Response {
  transactions: Transaction[];
  balance: Balance;
  count?: number;
}

interface Query {
  take: number;
  skip: number;
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<Balance | null>(null);
  const [query, setQuery] = useState<Query>({ take: 10, skip: 0 });
  const [pages, setPages] = useState(0);
  const [count, setCount] = useState<number>(0);

  async function loadTransactions(useQuery: Query): Promise<void> {
    try {
      const { data } = await api.get<Response>(
        `transactions?take=${useQuery.take}&skip=${useQuery.skip}`,
      );

      setTransactions(data.transactions);
      setBalance(data.balance);
      setCount(data.count ?? 0);
      setPages(Math.ceil(data.count ? data.count / 10 : 0));
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    loadTransactions(query);
  }, [query]);

  function handlePagination(page: number): void {
    const nextQuery: Query = {
      take: query.take,
      skip: page * 10 - 10,
    };

    setQuery(nextQuery);
  }

  function getInitialPageItems(): number {
    return query.skip + 1;
  }

  function getFinalPageItems(): number {
    return query.skip + 10 > count ? count : query.skip + 10;
  }

  return (
    <>
      <Header />
      <Container>
        <CardContainer>
          <Card>
            <header>
              <p>Entradas</p>
              <img src={income} alt="Income" />
            </header>
            <h1 data-testid="balance-income">{formatValue(balance?.income)}</h1>
          </Card>
          <Card>
            <header>
              <p>Saídas</p>
              <img src={outcome} alt="Outcome" />
            </header>
            <h1 data-testid="balance-outcome">
              {formatValue(balance?.outcome)}
            </h1>
          </Card>
          <Card total>
            <header>
              <p>Total</p>
              <img src={total} alt="Total" />
            </header>
            <h1 data-testid="balance-total">{formatValue(balance?.total)}</h1>
          </Card>
        </CardContainer>

        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Preço</th>
                <th>Categoria</th>
                <th>Data</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="title">{transaction.title}</td>
                  <td className={transaction.type}>
                    {transaction.type === 'outcome' && '- '}
                    {formatValue(transaction.value)}
                  </td>
                  <td>{transaction.category.title}</td>
                  <td>{formatDate(transaction.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {pages > 0 && (
            <PaginationContainer>
              <span>
                {`${getInitialPageItems()} - ${getFinalPageItems()} de ${count} transações`}
              </span>
              <Pagination
                count={pages}
                shape="rounded"
                onChange={(_, page) => handlePagination(page)}
              />
            </PaginationContainer>
          )}
        </TableContainer>
      </Container>
    </>
  );
};

export default Dashboard;

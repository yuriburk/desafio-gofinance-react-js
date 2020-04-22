import React, { useState, useEffect } from 'react';
import PaginationComponent from '@material-ui/lab/Pagination';

import { Container } from './styles';

interface PaginationProps {
  totalItems: number;
  handleQuery: Function;
}

interface Query {
  take: number;
  skip: number;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  handleQuery,
}: PaginationProps) => {
  const [pages, setPages] = useState(0);
  const [query, setQuery] = useState<Query>({ take: 10, skip: 0 });

  useEffect(() => setPages(Math.ceil(totalItems / 10)), [totalItems]);

  function getInitialPageItems(): number {
    return totalItems > 0 ? query.skip + 1 : 0;
  }

  function getFinalPageItems(): number {
    return query.skip + 10 > totalItems ? totalItems : query.skip + 10;
  }

  function handlePagination(page: number): void {
    const nextQuery: Query = {
      take: query.take,
      skip: page * 10 - 10,
    };

    setQuery(nextQuery);
    handleQuery(nextQuery.take, nextQuery.skip);
  }

  return (
    <Container>
      <span>
        {`${getInitialPageItems()} - ${getFinalPageItems()} de ${totalItems} transações`}
      </span>
      <PaginationComponent
        count={pages}
        shape="rounded"
        onChange={(_, page) => handlePagination(page)}
      />
    </Container>
  );
};

export default Pagination;

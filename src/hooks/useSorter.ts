import { useCallback, useState } from 'react';
import { DEFAULT_ORDER_BY, DEFAULT_SORT_BY } from '../constants';
import { ISorter } from '../interfaces';

export default function useSorter(sortBy: string = DEFAULT_SORT_BY, order: string = DEFAULT_ORDER_BY) {
  const [sorter, setSorter] = useState<ISorter>({ sortBy, order });

  const changeSortBy = useCallback((field: string) => setSorter({ ...sorter, sortBy: field }), [sorter]);

  const changeOrderBy = useCallback((direction: string) => setSorter({ ...sorter, order: direction }), [sorter]);

  const resetSorter = useCallback(() => setSorter({ sortBy: DEFAULT_SORT_BY, order: DEFAULT_ORDER_BY }), []);

  return { sorter, changeSortBy, changeOrderBy, setSorter, resetSorter };
}

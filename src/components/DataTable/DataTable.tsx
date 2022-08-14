import {
  Checkbox,
  Group,
  LoadingOverlay,
  Pagination,
  Table as MantineTable,
  TableProps as MantineTableProps
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Key, ReactNode, useMemo, useState } from 'react';

import { DEFAULT_PAGE_SIZE } from '../../common/constants';

export interface ColumnType<T> {
  title: string;
  key: keyof T;
}

interface TableProps<T> extends MantineTableProps {
  columns: ColumnType<T>[];
  data: T[];
  loading?: boolean | undefined;
  selectable?: boolean | undefined;
  sortable?: boolean | undefined;
  pageSize?: number | undefined;
  total?: number | undefined;
  onPageChange?: (page: number) => void;
}

function DataTable<T extends { id: Key }>({
  columns,
  data,
  loading = false,
  selectable = false,
  total = 0,
  pageSize = DEFAULT_PAGE_SIZE,
  onPageChange,
  ...props
}: TableProps<T>): JSX.Element {
  const [_selectedRows] = useState<T[]>([]);

  const largeScreen: boolean = useMediaQuery('(min-width: 1367px)');

  const tableCheckbox = useMemo<JSX.Element>(() => <Checkbox />, []);

  const tableColumns = useMemo<JSX.Element>(
    () => (
      <tr>
        {selectable && <th>{tableCheckbox}</th>}
        {columns.map((col: ColumnType<T>) => (
          <th key={String(col.key)}>{col.title.toUpperCase()}</th>
        ))}
      </tr>
    ),
    [selectable, tableCheckbox, columns]
  );

  const tableRows = useMemo<JSX.Element[]>(
    () =>
      data?.map((item: T) => (
        <tr key={item.id}>
          {selectable && <td>{tableCheckbox}</td>}
          {columns.map(({ key }: ColumnType<T>) => (
            <td key={String(key)}>{item[key] as unknown as ReactNode}</td>
          ))}
        </tr>
      )),
    [data, columns, selectable, tableCheckbox]
  );

  const tablePagination = useMemo<JSX.Element>(
    () => <Pagination total={Math.ceil(total / pageSize)} onChange={onPageChange} size={largeScreen ? 'md' : 'sm'} />,
    [largeScreen, onPageChange, total, pageSize]
  );

  return (
    <>
      <div style={{ position: 'relative' }}>
        <LoadingOverlay visible={loading} />
        <MantineTable fontSize={largeScreen ? 'sm' : 'xs'} my="md" {...props}>
          <thead>{tableColumns}</thead>
          <tbody>{tableRows}</tbody>
        </MantineTable>
      </div>
      <Group position="center">{tablePagination}</Group>
    </>
  );
}

export default DataTable;

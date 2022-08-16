import React, { useCallback, useMemo, useState } from 'react';

import {
  Checkbox,
  Group,
  LoadingOverlay,
  Pagination,
  Table as MantineTable,
  TableProps as MantineTableProps
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

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
  onPageChange?: ((page: number) => void) | undefined;
}

export default function DataTable<T>({
  columns,
  data,
  loading = false,
  selectable = false,
  total = 0,
  pageSize = DEFAULT_PAGE_SIZE,
  onPageChange,
  ...props
}: TableProps<T>): JSX.Element {
  /** STATE */
  const [selectedItems, setSelectedItems] = useState<T[]>([]);

  const largeScreen: boolean = useMediaQuery('(min-width: 1367px)');

  const toggleSelectAllItems = useCallback(
    () => setSelectedItems((currentSelectedItems: T[]) => (currentSelectedItems.length === data?.length ? [] : data)),
    [setSelectedItems, data]
  );

  const toggleSelectItem = useCallback((isSelected: boolean, item: T) => {
    setSelectedItems((selectedItems: T[]) =>
      isSelected
        ? [...selectedItems, item]
        : selectedItems.filter(
            (selectedItem: T) =>
              Object.entries(selectedItem).sort().toString() !== Object.entries(item).sort().toString()
          )
    );
  }, []);

  const tableColumns = useMemo<JSX.Element>(
    () => (
      <tr>
        {selectable && (
          <th style={{ width: 40 }}>
            <Checkbox
              onChange={toggleSelectAllItems}
              checked={selectedItems.length === data?.length}
              indeterminate={selectedItems.length > 0 && selectedItems.length !== data?.length}
            />
          </th>
        )}
        {columns.map((col: ColumnType<T>) => (
          <th key={String(col.key)}>{col.title.toUpperCase()}</th>
        ))}
      </tr>
    ),
    [selectable, toggleSelectAllItems, data, selectedItems, columns]
  );

  const tableRows = useMemo<JSX.Element[]>(
    () =>
      data?.map((item: T, index: number) => (
        // eslint-disable-next-line react/no-array-index-key
        <tr key={index}>
          {selectable && (
            <td>
              <Checkbox
                checked={selectedItems.includes(item)}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => toggleSelectItem(e.currentTarget.checked, item)}
              />
            </td>
          )}
          {columns.map(({ key }: ColumnType<T>) => (
            <td key={String(key)}>{item[key] as unknown as React.ReactNode}</td>
          ))}
        </tr>
      )),
    [data, selectable, selectedItems, toggleSelectItem, columns]
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

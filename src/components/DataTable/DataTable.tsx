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
  width?: number | undefined;
  sortable?: boolean | undefined;
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
    setSelectedItems((currentSelectedItems: T[]) =>
      isSelected
        ? [...currentSelectedItems, item]
        : currentSelectedItems.filter(
            (selectedItem: T) =>
              Object.entries(selectedItem).sort().toString() !== Object.entries(item).sort().toString()
          )
    );
  }, []);

  const tableHeaderCheckbox = useMemo(
    () => (
      <th style={{ width: 40 }}>
        <Checkbox
          checked={selectedItems.length === data?.length}
          indeterminate={selectedItems.length > 0 && selectedItems.length !== data?.length}
          onChange={toggleSelectAllItems}
        />
      </th>
    ),
    [data?.length, selectedItems.length, toggleSelectAllItems]
  );

  const tableHeader = useMemo(
    () => (
      <tr>
        {selectable && tableHeaderCheckbox}
        {columns.map((col: ColumnType<T>) => (
          <th key={String(col.key)} style={{ width: col.width }}>
            {col.title.toUpperCase()}
          </th>
        ))}
      </tr>
    ),
    [columns, selectable, tableHeaderCheckbox]
  );

  const tableRowCheckbox = useCallback(
    (item: T) => (
      <td>
        <Checkbox
          checked={selectedItems.includes(item)}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => toggleSelectItem(e.currentTarget.checked, item)}
        />
      </td>
    ),
    [selectedItems, toggleSelectItem]
  );

  const tableRows = useMemo(
    () =>
      data?.map((item: T, index: number) => (
        // eslint-disable-next-line react/no-array-index-key
        <tr key={index}>
          {selectable && tableRowCheckbox(item)}
          {columns.map(({ key }: ColumnType<T>) => (
            <td key={String(key)}>{item[key] as unknown as React.ReactNode}</td>
          ))}
        </tr>
      )),
    [columns, data, selectable, tableRowCheckbox]
  );

  const tablePagination = useMemo<JSX.Element>(
    () => <Pagination total={Math.ceil(total / pageSize)} onChange={onPageChange} size={largeScreen ? 'md' : 'sm'} />,
    [largeScreen, onPageChange, pageSize, total]
  );

  return (
    <>
      <div style={{ position: 'relative' }}>
        <LoadingOverlay visible={loading} />
        <MantineTable fontSize={largeScreen ? 'sm' : 'xs'} my="md" {...props}>
          <thead>{tableHeader}</thead>
          <tbody>{tableRows}</tbody>
        </MantineTable>
      </div>
      <Group position="center">{tablePagination}</Group>
    </>
  );
}

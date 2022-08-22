import React, { MutableRefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import {
  Checkbox,
  LoadingOverlay,
  Pagination,
  PaginationProps,
  Table as MantineTable,
  TableProps as MantineTableProps,
  TextInput
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons';

export interface ColumnType<T> {
  title: string;
  key: keyof T;
  width?: number;
  sortable?: boolean;
}

interface TableProps<T> extends MantineTableProps {
  columns: ColumnType<T>[];
  data: T[];
  pageSize: number;
  loading?: boolean;
  searchable?: boolean;
  sortable?: boolean;
  pagination?: PaginationProps;
  rowSelection?: {
    selectedRows: T[];
    onChange: (selectedRows: T[]) => void;
  };
}

export default function DataTable<T>({
  columns,
  data,
  pageSize,
  loading = false,
  searchable = false,
  rowSelection,
  pagination,
  ...props
}: TableProps<T>): JSX.Element {
  const [search, _setSearch] = useState<string>('');
  const largeScreen: boolean = useMediaQuery('(min-width: 1367px)');
  const selectedItems: MutableRefObject<T[] | undefined> = useRef(rowSelection?.selectedRows);

  const toggleSelectAllItems: () => void = useCallback(() => {
    if (rowSelection && selectedItems.current) {
      selectedItems.current = selectedItems.current.length === data?.length ? [] : data;
      rowSelection.onChange(selectedItems.current);
    }
  }, [data, rowSelection]);

  const toggleSelectItem: (isSelected: boolean, item: T) => void = useCallback(
    (isSelected: boolean, item: T) => {
      if (rowSelection && selectedItems.current) {
        selectedItems.current = isSelected
          ? [...selectedItems.current, item]
          : selectedItems.current.filter(
              (selectedItem: T) =>
                Object.entries(selectedItem).sort().toString() !== Object.entries(item).sort().toString()
            );
        rowSelection.onChange(selectedItems.current);
      }
    },
    [rowSelection]
  );

  const tableHeaderCheckbox: JSX.Element = useMemo(
    () => (
      <th style={{ width: 40 }}>
        <Checkbox
          checked={selectedItems.current && selectedItems.current.length === data?.length}
          indeterminate={
            selectedItems.current && selectedItems.current.length > 0 && selectedItems.current.length !== data?.length
          }
          onChange={toggleSelectAllItems}
        />
      </th>
    ),
    [data?.length, selectedItems, toggleSelectAllItems]
  );

  const tableHeader: JSX.Element = useMemo(
    () => (
      <tr>
        {rowSelection && tableHeaderCheckbox}
        {columns.map((col: ColumnType<T>) => (
          <th key={String(col.key)} style={{ width: col.width }}>
            {col.title.toUpperCase()}
          </th>
        ))}
      </tr>
    ),
    [columns, rowSelection, tableHeaderCheckbox]
  );

  const tableRowCheckbox: (item: T) => JSX.Element = useCallback(
    (item: T) => (
      <td>
        <Checkbox
          checked={selectedItems?.current?.includes(item)}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => toggleSelectItem(e.currentTarget.checked, item)}
        />
      </td>
    ),
    [selectedItems, toggleSelectItem]
  );

  const tableRows: JSX.Element[] = useMemo(
    () =>
      data?.map((item: T, index: number) => (
        // eslint-disable-next-line react/no-array-index-key
        <tr key={index}>
          {rowSelection && tableRowCheckbox(item)}
          {columns.map((col: ColumnType<T>) => (
            <td key={String(col.key)}>{item[col.key] as unknown as React.ReactNode}</td>
          ))}
        </tr>
      )),
    [columns, data, rowSelection, tableRowCheckbox]
  );

  const tablePagination: JSX.Element | undefined = useMemo(
    () =>
      pagination && (
        <Pagination
          {...pagination}
          total={Math.ceil(pagination.total / pageSize)}
          onChange={pagination.onChange}
          position={pagination.position || 'center'}
          size={largeScreen ? 'md' : 'sm'}
        />
      ),
    [largeScreen, pageSize, pagination]
  );

  useEffect(() => {
    selectedItems.current = rowSelection?.selectedRows;
  }, [rowSelection?.selectedRows]);

  return (
    <>
      {searchable && (
        <TextInput
          placeholder="Search by any field"
          my="md"
          icon={<IconSearch size={16} stroke={1.5} />}
          defaultValue={search}
        />
      )}
      <div style={{ position: 'relative' }}>
        <LoadingOverlay visible={loading} />
        <MantineTable {...props} fontSize={largeScreen ? 'sm' : 'xs'} my="md">
          <thead>{tableHeader}</thead>
          <tbody>{tableRows}</tbody>
        </MantineTable>
      </div>
      {tablePagination}
    </>
  );
}

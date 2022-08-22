import React, { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';

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
  const selectedRows: MutableRefObject<T[] | undefined> = useRef(rowSelection?.selectedRows);

  const toggleSelectAllItems: () => void = useCallback(() => {
    if (rowSelection && selectedRows.current) {
      selectedRows.current = selectedRows.current.length === data?.length ? [] : data;
      rowSelection.onChange(selectedRows.current);
    }
  }, [data, rowSelection]);

  const toggleSelectItem: (isSelected: boolean, item: T) => void = useCallback(
    (isSelected: boolean, item: T) => {
      if (rowSelection && selectedRows.current) {
        selectedRows.current = isSelected
          ? [...selectedRows.current, item]
          : selectedRows.current.filter(
              (selectedItem: T) =>
                Object.entries(selectedItem).sort().toString() !== Object.entries(item).sort().toString()
            );
        rowSelection.onChange(selectedRows.current);
      }
    },
    [rowSelection]
  );

  useEffect(() => {
    selectedRows.current = rowSelection?.selectedRows;
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
          <thead>
            <tr>
              {rowSelection && (
                <th style={{ width: 40 }}>
                  <Checkbox
                    checked={selectedRows.current && selectedRows.current.length === data?.length}
                    indeterminate={
                      selectedRows.current &&
                      selectedRows.current.length > 0 &&
                      selectedRows.current.length !== data?.length
                    }
                    onChange={toggleSelectAllItems}
                  />
                </th>
              )}
              {columns.map((col: ColumnType<T>) => (
                <th key={String(col.key)} style={{ width: col.width }}>
                  {col.title.toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.map((item: T, index: number) => (
              // eslint-disable-next-line react/no-array-index-key
              <tr key={index}>
                {rowSelection && (
                  <td>
                    <Checkbox
                      checked={selectedRows.current?.includes(item)}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        toggleSelectItem(e.currentTarget.checked, item)
                      }
                    />
                  </td>
                )}
                {columns.map((col: ColumnType<T>) => (
                  <td key={String(col.key)}>{item[col.key] as unknown as React.ReactNode}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </MantineTable>
      </div>
      {pagination && (
        <Pagination
          {...pagination}
          total={Math.ceil(pagination.total / pageSize)}
          onChange={pagination.onChange}
          position={pagination.position || 'center'}
          size={largeScreen ? 'md' : 'sm'}
        />
      )}
    </>
  );
}

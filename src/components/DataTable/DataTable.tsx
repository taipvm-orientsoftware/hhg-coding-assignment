import React, { MutableRefObject, PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';

import {
  Checkbox,
  Group,
  LoadingOverlay,
  Pagination,
  PaginationProps,
  Table as MantineTable,
  TableProps as MantineTableProps,
  Text,
  TextInput
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconChevronDown, IconChevronUp, IconSearch, IconSelector } from '@tabler/icons';

import { Button, Span, Th } from './DataTable.styles';

export interface ColumnType<T> {
  title: string;
  key: keyof T;
  width?: number | undefined;
  sortable?: boolean | undefined;
  render?: ((text: string, record: T, index: number) => React.ReactNode) | undefined;
}

interface HeaderColumnProps extends PropsWithChildren, React.ThHTMLAttributes<HTMLTableCellElement> {
  reversed: boolean;
  sorted: boolean;
  onSort: () => void;
}

function HeaderColumn({ children, reversed, sorted, onSort }: HeaderColumnProps): JSX.Element {
  const directionIcon = reversed ? IconChevronUp : IconChevronDown;
  const Icon = sorted ? directionIcon : IconSelector;
  return (
    <Th>
      <Button onClick={onSort}>
        <Group position="apart">
          <Text size="xs">{children}</Text>
          <Span>
            <Icon size={15} stroke={1.5} />
          </Span>
        </Group>
      </Button>
    </Th>
  );
}

interface RowSelectionProps<T> {
  selectedRows: T[];
  onChange: (selectedRows: T[]) => void;
}

interface TableProps<T> extends MantineTableProps {
  columns: ColumnType<T>[];
  data: T[];
  pageSize: number;
  loading?: boolean | undefined;
  searchable?: boolean | undefined;
  sortable?: boolean | undefined;
  pagination?: PaginationProps | undefined;
  rowSelection?: RowSelectionProps<T> | undefined;
}

export default function DataTable<T extends object>({
  columns,
  data,
  pageSize,
  loading = false,
  searchable = false,
  rowSelection,
  pagination,
  ...props
}: TableProps<T>): JSX.Element {
  const [searchTerm, _setSearchTerm] = useState<string>('');
  const [sortBy, setSortBy] = useState<ColumnType<T>['key'] | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState<boolean>(false);

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

  const handleSortChange: (field: ColumnType<T>['key']) => void = useCallback(
    (field: ColumnType<T>['key']) => {
      const reversed = field === sortBy ? !reverseSortDirection : false;
      setReverseSortDirection(reversed);
      setSortBy(field);
    },
    [reverseSortDirection, sortBy]
  );

  useEffect(() => {
    selectedRows.current = rowSelection?.selectedRows;
  }, [rowSelection?.selectedRows]);

  return (
    <>
      {searchable && (
        <TextInput
          placeholder="Search by any field"
          icon={<IconSearch size={20} stroke={1.5} />}
          defaultValue={searchTerm}
          size={largeScreen ? 'sm' : 'xs'}
        />
      )}
      <div style={{ position: 'relative' }}>
        <LoadingOverlay visible={loading} />
        <MantineTable {...props} fontSize={largeScreen ? 'sm' : 'xs'}>
          <thead>
            <tr>
              {rowSelection && (
                <th style={{ width: 40 }}>
                  <Checkbox
                    checked={selectedRows.current?.length !== 0 && selectedRows.current?.length === data?.length}
                    indeterminate={
                      selectedRows.current &&
                      selectedRows.current.length > 0 &&
                      selectedRows.current.length !== data?.length
                    }
                    onChange={toggleSelectAllItems}
                  />
                </th>
              )}
              {columns.map(({ key, title, width }: ColumnType<T>) => (
                <HeaderColumn
                  key={String(key)}
                  sorted={sortBy === key}
                  reversed={reverseSortDirection}
                  onSort={() => handleSortChange(key)}
                  style={{ width }}
                >
                  {title.toUpperCase()}
                </HeaderColumn>
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
                {columns.map(({ key, render }: ColumnType<T>) => (
                  <td key={String(key)}>
                    {render ? render(String(item[key]), item, index) : (item[key] as unknown as string)}
                  </td>
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

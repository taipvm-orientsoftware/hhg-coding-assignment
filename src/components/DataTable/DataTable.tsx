import { Table, TableProps } from '@mantine/core';

export interface ColumnType {
  name: string;
  key: string;
}

interface DataTableProps<T> extends TableProps {
  columns: ColumnType[];
  sortable: boolean;
  data?: T[];
}

function DataTable<T>({ columns, ...props }: DataTableProps<T>): JSX.Element {
  return (
    <Table {...props}>
      <thead>
        <tr>
          {columns.map((column: ColumnType) => (
            <th key={column.key}>{column.name}</th>
          ))}
        </tr>
      </thead>
      <tbody />
    </Table>
  );
}

export default DataTable;

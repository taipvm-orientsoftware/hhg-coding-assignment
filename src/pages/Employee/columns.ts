import { ColumnsType } from 'antd/lib/table';
import { IEmployee } from '../../interfaces';

const columns: ColumnsType<IEmployee> = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Position',
    dataIndex: 'position',
  },
];

export default columns;

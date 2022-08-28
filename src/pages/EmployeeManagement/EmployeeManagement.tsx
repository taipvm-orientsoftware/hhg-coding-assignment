import { FormEvent, useCallback, useEffect, useState } from 'react';

import { Button, Drawer } from '@mantine/core';
import { useForm, UseFormReturnType } from '@mantine/form';
import { useMediaQuery } from '@mantine/hooks';
import { IconTrash, IconUserPlus } from '@tabler/icons';

import { DEFAULT_PAGE_SIZE } from '../../common/constants';
import { DataTable } from '../../components';
import { ColumnType } from '../../components/DataTable';
import { ICreateEmployeeRequest } from '../../domain/dtos/createEmployeeRequest.dto';
import { IEmployee } from '../../domain/models/employee.model';
import { employeeApiService } from '../../domain/services';
import { useDeleteRequest, useGetRequest, usePostRequest } from '../../hooks';
import { pushNotification } from '../../utils';
import { EmployeeAdditionForm } from './components';

const columns: ColumnType<IEmployee>[] = [
  {
    title: 'ID',
    key: 'id'
  },
  {
    title: 'Name',
    key: 'name'
  },
  {
    title: 'Email',
    key: 'email'
  },
  {
    title: 'Position',
    key: 'position'
  },
  {
    title: 'Created Date',
    key: 'createdAt'
  }
];

export default function EmployeeManagement(): JSX.Element {
  /* State */
  const [isLoading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [toggleEmployeeAdditionForm, setToggleEmployeeAdditionForm] = useState<boolean>(false);
  const [reload, setReload] = useState<number>(0);
  const [selectedEmployees, setSelectedEmployees] = useState<IEmployee[]>([]);

  /* Custom hooks */
  const largeScreen: boolean = useMediaQuery('(min-width: 1367px)');
  const employeeAdditionForm: UseFormReturnType<ICreateEmployeeRequest> = useForm<ICreateEmployeeRequest>({
    initialValues: {
      name: '',
      email: '',
      position: ''
    }
  });
  const [data, getData] = useGetRequest(employeeApiService.getEmployeesWithPagination);
  const [, postData] = usePostRequest(employeeApiService.createEmployee);
  const [, deleteData] = useDeleteRequest(employeeApiService.deleteEmployee);

  /* Functions */
  const handlePaginationChange: (page: number) => void = useCallback((page: number) => {
    setSelectedEmployees([]);
    setPage(page);
  }, []);

  const reloadTable: () => void = useCallback(() => {
    setSelectedEmployees([]);
    setReload((reload: number) => reload + 1);
  }, []);

  const handleSubmitForm: (e: FormEvent<HTMLFormElement>) => Promise<void> = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        await postData(employeeAdditionForm.values);
        pushNotification('success', 'Add new employee successfully!');
        reloadTable();
      } catch (error) {
        pushNotification('error', 'Add new employee fail!');
      }
      employeeAdditionForm.reset();
      setToggleEmployeeAdditionForm(false);
    },
    [employeeAdditionForm, postData, reloadTable]
  );

  const handleBulkDeleteEmployees: (employees: IEmployee[]) => Promise<void> = useCallback(
    async (employees: IEmployee[]) => {
      if (employees.length === 1) {
        const { id } = employees[0];
        setLoading(true);
        try {
          await deleteData(id);
          pushNotification('success', `Delete employee id ${id} successfully!`);
          reloadTable();
        } catch (error) {
          pushNotification('error', `Delete employee id ${id} fail!`);
        }
        setLoading(false);
      }
    },
    [deleteData, reloadTable]
  );

  /* Effects */
  useEffect(() => {
    (async function fetchEmployees() {
      setLoading(true);
      try {
        await getData({ page, limit: DEFAULT_PAGE_SIZE, sortBy: 'createdAt', orderBy: 'asc' });
      } catch (error) {
        pushNotification('error', `Fail to fetch employees! Something went wrong!`);
      }
      setLoading(false);
    })();
  }, [getData, page, reload]);

  return (
    <>
      <div>
        <Button
          variant="filled"
          leftIcon={<IconUserPlus size={20} />}
          size={largeScreen ? 'sm' : 'xs'}
          onClick={() => setToggleEmployeeAdditionForm(true)}
          mr="md"
        >
          Add Employee
        </Button>
        {selectedEmployees.length > 0 && (
          <Button
            variant="filled"
            color="red"
            leftIcon={<IconTrash size={20} />}
            size={largeScreen ? 'sm' : 'xs'}
            onClick={() => handleBulkDeleteEmployees(selectedEmployees)}
          >
            Delete {selectedEmployees.length} Employee{selectedEmployees.length > 1 && 's'}
          </Button>
        )}
      </div>
      <DataTable
        columns={columns}
        data={data?.items || []}
        pageSize={DEFAULT_PAGE_SIZE}
        highlightOnHover
        loading={isLoading}
        searchable
        rowSelection={{
          selectedRows: selectedEmployees,
          onChange: (items: IEmployee[]) => setSelectedEmployees(items)
        }}
        pagination={{
          total: data?.total || 0,
          onChange: handlePaginationChange
        }}
      />
      <Drawer
        opened={toggleEmployeeAdditionForm}
        onClose={() => setToggleEmployeeAdditionForm(false)}
        position="right"
        title="ADD NEW EMPLOYEE"
        size="xl"
        padding={32}
      >
        <EmployeeAdditionForm form={employeeAdditionForm} onSubmit={handleSubmitForm} loading={isLoading} />
      </Drawer>
    </>
  );
}

import { FormEvent, useCallback, useEffect, useState } from 'react';

import { Button, Drawer } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMediaQuery } from '@mantine/hooks';
import { IconTrash, IconUserPlus } from '@tabler/icons';

import { DEFAULT_PAGE_SIZE } from '../../common/constants';
import { DataTable } from '../../components';
import { ColumnType } from '../../components/DataTable';
import { ICreateEmployeeRequest } from '../../domain/dtos/createEmployeeRequest.dto';
import { IEmployee } from '../../domain/models/employee.model';
import { employeeApiService } from '../../domain/services';
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
  }
];

export default function EmployeeManagement() {
  /* State */
  const [loading, setLoading] = useState<boolean>(false);
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [toggleEmployeeAdditionForm, setToggleEmployeeAdditionForm] = useState<boolean>(false);
  const [reload, setReload] = useState<number>(0);
  const [selectedEmployees, setSelectedEmployees] = useState<IEmployee[]>([]);

  /* Custom hooks */
  const largeScreen = useMediaQuery('(min-width: 1367px)');
  const employeeAdditionForm = useForm<ICreateEmployeeRequest>({
    initialValues: {
      name: '',
      email: '',
      position: ''
    }
  });

  /* Functions */
  const handlePaginationChange = useCallback<(page: number) => void>((page: number) => {
    setSelectedEmployees([]);
    setPage(page);
  }, []);

  const reloadTable = useCallback<() => void>(() => {
    setSelectedEmployees([]);
    setReload((reload: number) => reload + 1);
  }, []);

  const handleSubmitForm = useCallback<(e: FormEvent<HTMLFormElement>) => Promise<void>>(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const { values } = employeeAdditionForm;
      try {
        await employeeApiService.createEmployee(values);
        pushNotification('success', 'Add new employee successfully!');
      } catch (error) {
        pushNotification('error', 'Add new employee fail!');
      } finally {
        employeeAdditionForm.reset();
        setToggleEmployeeAdditionForm(false);
        reloadTable();
      }
    },
    [employeeAdditionForm, reloadTable]
  );

  const handleBulkDeleteEmployees = useCallback<(employees: IEmployee[]) => Promise<void>>(
    async (employees: IEmployee[]) => {
      const employeeIds: IEmployee['id'][] = employees.map(({ id }: IEmployee) => id);
      setLoading(true);
      try {
        await employeeApiService.bulkDeleteEmployees(employeeIds);
        pushNotification('success', `Delete ${employees.length} employee(s) successfully!`);
      } catch (error) {
        pushNotification('error', 'Delete employees fail!');
      } finally {
        setLoading(false);
        reloadTable();
      }
    },
    [reloadTable]
  );

  /* Effects */
  useEffect(() => {
    (async function fetchEmployees() {
      const paginationQueryParams = { page, limit: DEFAULT_PAGE_SIZE };
      setLoading(true);
      try {
        const { data } = await employeeApiService.getEmployeesWithPagination(paginationQueryParams);
        setEmployees(data.items);
        setTotal(data.total);
      } catch (error) {
        pushNotification('error', `Fail to fetch employees! Something went wrong!`);
      } finally {
        setLoading(false);
      }
    })();
  }, [page, reload]);

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
        data={employees}
        pageSize={DEFAULT_PAGE_SIZE}
        highlightOnHover
        loading={loading}
        searchable
        rowSelection={{
          selectedRows: selectedEmployees,
          onChange: (items: IEmployee[]) => setSelectedEmployees(items)
        }}
        pagination={{
          total,
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
        <EmployeeAdditionForm form={employeeAdditionForm} onSubmit={handleSubmitForm} loading={loading} />
      </Drawer>
    </>
  );
}

import { FormEvent, useCallback, useEffect, useState } from 'react';

import { Button, Container, Drawer } from '@mantine/core';
import { useForm, UseFormReturnType } from '@mantine/form';
import { useMediaQuery } from '@mantine/hooks';
import { IconTrash, IconUserPlus } from '@tabler/icons';

import { DEFAULT_PAGE_SIZE } from '../../common/constants';
import { DataTable } from '../../components';
import { ColumnType } from '../../components/DataTable';
import { ICreateEmployeeRequest } from '../../domain/dtos/createEmployeeRequest.dto';
import { IEmployee } from '../../domain/models/employee.model';
import { employeeApiService } from '../../domain/services';
import { useGetRequest, usePostRequest } from '../../hooks';
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

export default function Employee(): JSX.Element {
  /** State */
  const [isLoading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [toggleEmployeeAdditionForm, setToggleEmployeeAdditionForm] = useState<boolean>(false);
  const [reload, setReload] = useState<number>(0);

  /** Custom Hooks */
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

  /** Functions */
  const handleSubmitForm = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
        await postData(employeeAdditionForm.values);
        pushNotification('success', 'Add new employee successfully!');
        setReload((reload: number) => reload + 1);
      } catch (error) {
        pushNotification('error', 'Add new employee fail!');
      }
      employeeAdditionForm.reset();
      setToggleEmployeeAdditionForm(false);
    },
    [employeeAdditionForm, postData]
  );

  /** Effects */
  useEffect(() => {
    (async function fetchEmployees() {
      setLoading(true);
      try {
        await getData({ page, limit: DEFAULT_PAGE_SIZE });
      } catch (error) {
        //
      }
      setLoading(false);
    })();
  }, [getData, page, reload]);

  return (
    <>
      <Container size="lg" my="lg" sx={{ width: '100%' }}>
        <Button.Group>
          <Button
            variant="outline"
            leftIcon={<IconUserPlus size={20} />}
            size={largeScreen ? 'sm' : 'xs'}
            onClick={() => setToggleEmployeeAdditionForm(true)}
          >
            Add Employee
          </Button>
          <Button variant="outline" color="red" leftIcon={<IconTrash size={20} />} size={largeScreen ? 'sm' : 'xs'}>
            Delete Employees
          </Button>
        </Button.Group>
        <DataTable
          columns={columns}
          data={data.items}
          striped
          highlightOnHover
          selectable
          total={data.total}
          loading={isLoading}
          onPageChange={(page: number) => setPage(page)}
        />
      </Container>
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

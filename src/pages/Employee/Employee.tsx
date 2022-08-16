import { FormEvent, useCallback, useEffect, useState } from 'react';

import { Button, Container, Drawer } from '@mantine/core';
import { useForm, UseFormReturnType } from '@mantine/form';
import { useMediaQuery } from '@mantine/hooks';
import { IconUserPlus } from '@tabler/icons';

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
  /** STATE */
  const [isLoading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [toggleEmployeeAdditionForm, setToggleEmployeeAdditionForm] = useState<boolean>(false);
  const [effect, setEffect] = useState<number>(0);

  /** CUSTOM HOOKS */
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

  /** FUNCTIONS */
  const handleSubmitForm = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
        await postData(employeeAdditionForm.values);
        pushNotification('success', 'Add new employee successfully!');
        setEffect((effect: number) => effect + 1);
      } catch (error) {
        pushNotification('error', 'Add new employee fail!');
      }
      employeeAdditionForm.reset();
      setToggleEmployeeAdditionForm(false);
    },
    [employeeAdditionForm, postData]
  );

  /** EFFECTS */
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
  }, [getData, page, effect]);

  return (
    <>
      <Container size="lg" my="lg" sx={{ width: '100%' }}>
        <Button
          variant="outline"
          leftIcon={<IconUserPlus size={20} />}
          size={largeScreen ? 'sm' : 'xs'}
          onClick={() => setToggleEmployeeAdditionForm(true)}
        >
          Add Employee
        </Button>
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

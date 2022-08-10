import { Button, Center, Container, Drawer, LoadingOverlay, Pagination, Table } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMediaQuery } from '@mantine/hooks';
import { IconUserPlus } from '@tabler/icons';
import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';

import { DEFAULT_PAGE_SIZE } from '../../common/constants';
import { ICreateEmployeeRequest } from '../../domain/dtos/createEmployeeRequest.dto';
import { IEmployee } from '../../domain/models/employee.model';
import { employeeApiService } from '../../domain/services';
import { useGetRequest, usePostRequest } from '../../hooks';
import { EmployeeAdditionForm } from './components';

export default function Employee(): JSX.Element {
  /** STATE */
  const [isLoading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [toggleEmployeeAdditionForm, setToggleEmployeeAdditionForm] = useState<boolean>(false);
  // const [effect, setEffect] = useState<number>(0);

  /** CUSTOM HOOKS */
  const largeScreen = useMediaQuery('(min-width: 1367px)');
  const employeeAdditionForm = useForm<ICreateEmployeeRequest>({
    initialValues: {
      name: '',
      email: '',
      position: ''
    }
  });
  const [data, getData] = useGetRequest(employeeApiService.getEmployeesWithPagination);
  const [, postData] = usePostRequest(employeeApiService.createEmployee);

  /** FUNCTIONS */
  const handlePageChange = useCallback((page: number) => setPage(page), []);

  const handleToggleEmployeeAdditionForm = useCallback(() => {
    setToggleEmployeeAdditionForm((toggle: boolean) => !toggle);
  }, []);

  const handleSubmitForm = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      await postData(employeeAdditionForm.values);
      // setEffect(effect => effect + 1);
    },
    [employeeAdditionForm, postData]
  );

  const tableHeader = useMemo(
    () => (
      <tr>
        <th>No</th>
        <th>Name</th>
        <th>Email</th>
        <th>Position</th>
      </tr>
    ),
    []
  );

  const tableRows = useMemo(
    () =>
      data.items?.map((employee: IEmployee) => (
        <tr key={employee.id}>
          <td>{employee.id}</td>
          <td>{employee.name}</td>
          <td>{employee.email}</td>
          <td>{employee.position}</td>
        </tr>
      )),
    [data]
  );

  /** EFFECTS */
  useEffect(() => {
    (async function fetchEmployees() {
      setLoading(true);
      try {
        await getData({ page, limit: DEFAULT_PAGE_SIZE });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
      setLoading(false);
    })();
  }, [getData, page, postData]);

  return (
    <>
      <Container size="lg" sx={{ width: '100%' }} my="lg">
        <Button
          variant="outline"
          leftIcon={<IconUserPlus size={20} />}
          size={largeScreen ? 'sm' : 'xs'}
          onClick={handleToggleEmployeeAdditionForm}
        >
          Add Employee
        </Button>
        <LoadingOverlay visible={isLoading} />
        <Table striped fontSize={largeScreen ? 'sm' : 'xs'} my="md">
          <thead>{tableHeader}</thead>
          <tbody>{tableRows}</tbody>
        </Table>
        <Center my="md">
          <Pagination
            total={Math.ceil(data.total / DEFAULT_PAGE_SIZE)}
            onChange={handlePageChange}
            size={largeScreen ? 'md' : 'sm'}
          />
        </Center>
      </Container>
      <Drawer
        opened={toggleEmployeeAdditionForm}
        onClose={handleToggleEmployeeAdditionForm}
        position="right"
        title="ADD NEW EMPLOYEE"
        size="xl"
        padding={32}
      >
        <EmployeeAdditionForm form={employeeAdditionForm} onSubmit={handleSubmitForm} />
      </Drawer>
    </>
  );
}

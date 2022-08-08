import { Button, Center, Container, Drawer, LoadingOverlay, Pagination, Table } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMediaQuery } from '@mantine/hooks';
import { IconUserPlus } from '@tabler/icons';
import { FormEvent, useCallback, useEffect, useState } from 'react';

import { DEFAULT_PAGE_SIZE } from '../../common/constants';
import { ICreateEmployeeRequest } from '../../domain/dtos/createEmployeeRequest.dto';
import { IEmployee } from '../../domain/models/employee.model';
import { employeeApiService } from '../../domain/services';
import { EmployeeAdditionForm } from './components';

export default function Employee(): JSX.Element {
  /** useState */
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [toggleEmployeeAdditionForm, setToggleEmployeeAdditionForm] = useState<boolean>(false);
  // const [effect, setEffect] = useState<number>(0);

  /** custom hooks */
  const desktopScreen = useMediaQuery('(min-width: 1025px)');
  const employeeAdditionForm = useForm<ICreateEmployeeRequest>({
    initialValues: {
      name: '',
      email: '',
      position: ''
    }
  });
  // const { pagination, changeCurrentPage, resetPagination } = usePagination();
  // const { postData } = usePostRequest(addEmployeeAPI);

  const handlePageChange = useCallback((page: number) => setPage(page), []);

  const handleToggleEmployeeAdditionForm = useCallback(() => {
    setToggleEmployeeAdditionForm((toggle: boolean) => !toggle);
  }, []);

  const handleSubmitForm = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      console.log(employeeAdditionForm.values);
      event.preventDefault();
      // postData(data);
      // additionEmployeeForm.resetFields();
      // resetPagination();
      // setToggleAdditionEmployeeForm(false);
      // setEffect(effect => {
      //   return effect + 1;
      // });
    },
    [employeeAdditionForm]
  );

  /** useEffect */
  useEffect(() => {
    (async function getData() {
      setLoading(true);
      try {
        const { data } = await employeeApiService.getEmployeesWithPagination({ page, limit: DEFAULT_PAGE_SIZE });
        setEmployees(data.items);
        setTotal(data.total);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
      setLoading(false);
    })();
  }, [page]);

  return (
    <>
      <Container size="lg" sx={{ width: '100%' }} my="lg">
        <Button variant="outline" leftIcon={<IconUserPlus size={20} />} onClick={handleToggleEmployeeAdditionForm}>
          Add Employee
        </Button>
        <LoadingOverlay visible={isLoading} />
        <Table striped fontSize={desktopScreen ? 'sm' : 'xs'} my="md">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Position</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee: IEmployee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.position}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Center my="md">
          <Pagination
            total={Math.ceil(total / DEFAULT_PAGE_SIZE)}
            onChange={handlePageChange}
            size={desktopScreen ? 'md' : 'sm'}
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

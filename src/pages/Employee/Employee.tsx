import { Center, Container, LoadingOverlay, Pagination, Table } from '@mantine/core';
import { useCallback, useEffect, useState } from 'react';

import { employeeApiService } from '../../domain/services';
import { IEmployee } from '../../interfaces';

export default function Employee(): JSX.Element {
  /** useState */
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  // const [toggleAdditionEmployeeForm, setToggleAdditionEmployeeForm] = useState<boolean>(false);
  // const [effect, setEffect] = useState<number>(0);

  // const [additionEmployeeForm] = Form.useForm();

  /** custom hooks */
  // const { pagination, changeCurrentPage, resetPagination } = usePagination();
  // const { postData } = usePostRequest(addEmployeeAPI);

  const handlePageChange = useCallback((page: number) => setPage(page), []);

  // const handleToggleAdditionEmployeeForm = useCallback(() => {
  //   setToggleAdditionEmployeeForm(toggle => !toggle);
  // }, []);

  // const handleSubmitForm = useCallback(
  //   (data: IAddEmployeeData) => {
  //     postData(data);
  //     additionEmployeeForm.resetFields();
  //     resetPagination();
  //     setToggleAdditionEmployeeForm(false);
  //     setEffect(effect => {
  //       return effect + 1;
  //     });
  //   },
  //   [postData, resetPagination, additionEmployeeForm]
  // );

  /** useEffect */
  useEffect(() => {
    (async function getData() {
      setLoading(true);
      try {
        const { data } = await employeeApiService.getEmployeesWithPagination({ page, limit: 10 });
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
    <Container size="lg" sx={{ width: '100%' }} my="lg">
      <LoadingOverlay visible={isLoading} />
      <Table striped fontSize="xs">
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
      <Center>
        <Pagination total={Math.ceil(total / 10)} onChange={handlePageChange} size="sm" my="md" />
      </Center>
    </Container>
  );
}

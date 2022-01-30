import { useCallback, useState } from 'react';
import { getEmployeesAPI } from '../api/employeeAPI';
import { IEmployee, IGetEmployeesParams } from '../interfaces';

export default function useGetEmployees() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [total, setTotal] = useState<number>(0);

  const getEmployees = useCallback(async (params?: IGetEmployeesParams) => {
    setIsLoading(true);

    try {
      const response = await getEmployeesAPI(params);
      setEmployees(response.data.employees);
      setTotal(response.data.total);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    employees,
    total,
    getEmployees,
  };
}

import { useCallback, useState } from 'react';
import { addEmployeeAPI } from '../api/employeeAPI';
import { NotificationType } from '../constants';
import { IAddEmployeeData } from '../interfaces';
import { pushNotification } from '../utils';

export default function usePostEmployee() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<number>(0);

  const postEmployee = useCallback(async (body: IAddEmployeeData) => {
    setIsLoading(true);

    try {
      const { status } = await addEmployeeAPI(body);
      setStatus(status);
      pushNotification('Add employee successfully!', NotificationType.SUCCESS);
    } catch (error) {
      pushNotification('Add employee fail!', NotificationType.ERROR);
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    status,
    postEmployee,
  };
}

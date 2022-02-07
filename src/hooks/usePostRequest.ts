import { AxiosPromise } from 'axios';
import { useCallback, useState } from 'react';
import { NotificationType } from '../constants';
import { pushNotification } from '../utils';

export default function usePostRequest(
  callbackfn: (body: any) => AxiosPromise
) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<number>(0);

  const postData = useCallback(
    async body => {
      setIsLoading(true);

      try {
        const { status } = await callbackfn(body);
        setStatus(status);
        pushNotification(
          'Add employee successfully!',
          NotificationType.SUCCESS
        );
      } catch (error) {
        pushNotification('Add employee fail!', NotificationType.ERROR);
      }
      setIsLoading(false);
    },
    [callbackfn]
  );

  return {
    isLoading,
    status,
    postData,
  };
}

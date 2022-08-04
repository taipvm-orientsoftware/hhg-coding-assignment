import { AxiosPromise } from 'axios';
import { useCallback, useState } from 'react';

export default function usePostRequest<T>(callbackfn: (body: T) => AxiosPromise) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<number>(0);

  const postData = useCallback(
    async (body: T) => {
      setIsLoading(true);

      const { status } = await callbackfn(body);
      setStatus(status);

      setIsLoading(false);
    },
    [callbackfn]
  );

  return {
    isLoading,
    status,
    postData
  };
}

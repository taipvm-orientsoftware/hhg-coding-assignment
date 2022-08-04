import { AxiosPromise } from 'axios';
import { useCallback, useState } from 'react';

export default function useGetRequest<T>(callbackFn: (params: Record<string, unknown>) => AxiosPromise<T>) {
  const [data, setData] = useState<T | T[]>([]);

  const getData = useCallback(
    async (params: Record<string, unknown>) => {
      const response = await callbackFn(params);
      setData(response.data);
    },
    [callbackFn]
  );

  return [data, getData];
}

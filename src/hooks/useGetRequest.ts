import { useCallback, useState } from 'react';

import { AxiosPromise } from 'axios';

type UseGetRequest<T, P> = [T, (params: P) => Promise<void>];

export default function useGetRequest<T, P>(callbackFn: (params: P) => AxiosPromise<T>): UseGetRequest<T, P> {
  const [data, setData] = useState<T>({} as T);

  const getData = useCallback(
    async (params: P) => {
      const response = await callbackFn(params);
      setData(response.data);
    },
    [callbackFn]
  );

  return [data, getData];
}

import { useCallback, useState } from 'react';

import { AxiosPromise } from 'axios';

export type GetDataFunction<P> = (params: P) => Promise<void>;

export type UseGetRequest<T, P> = [T | null, GetDataFunction<P>];

export default function useGetRequest<T, P>(callbackFn: (params: P) => AxiosPromise<T>): UseGetRequest<T, P> {
  const [data, setData] = useState<T | null>(null);

  const getData: GetDataFunction<P> = useCallback(
    async (params: P) => {
      const response = await callbackFn(params);
      setData(response.data);
    },
    [callbackFn]
  );

  return [data, getData];
}

import { AxiosPromise } from 'axios';
import { useCallback, useState } from 'react';

import { IEmployee } from '../interfaces';

export default function useGetRequest(callbackfn: (params: any) => AxiosPromise) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<IEmployee[]>([]);
  const [total, setTotal] = useState<number>(0);

  const getData = useCallback(
    async <T>(params: T) => {
      setIsLoading(true);

      try {
        const response = await callbackfn(params);
        setData(response.data.data);
        setTotal(response.data.total);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    },
    [callbackfn]
  );

  return {
    isLoading,
    data,
    total,
    getData,
  };
}

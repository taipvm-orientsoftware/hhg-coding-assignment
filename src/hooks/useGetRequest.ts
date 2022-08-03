import { AxiosPromise } from 'axios';
import { useCallback, useState } from 'react';

export default function useGetRequest(callbackFn: (params: unknown) => AxiosPromise) {
  const [data, setData] = useState(null);

  const getData = useCallback(
    async (params: unknown) => {
      const response = await callbackFn(params);
      setData(response.data);
    },
    [callbackFn]
  );

  return [data, getData];
}

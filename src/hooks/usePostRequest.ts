import { useCallback, useState } from 'react';

import { AxiosPromise } from 'axios';

type UsePostRequest<T, D> = [T, (body: D) => Promise<void>];

export default function usePostRequest<T, D>(callbackfn: (body: D) => AxiosPromise<T>): UsePostRequest<T, D> {
  const [data, setData] = useState<T>({} as T);

  const postData = useCallback(
    async (data: D) => {
      const response = await callbackfn(data);
      setData(response.data);
    },
    [callbackfn]
  );

  return [data, postData];
}

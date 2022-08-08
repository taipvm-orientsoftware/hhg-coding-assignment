import { AxiosPromise } from 'axios';
import { useCallback, useState } from 'react';

type UsePostRequestReturnType<T, D> = [T, (body: D) => Promise<void>];

export default function usePostRequest<T, D>(callbackfn: (body: D) => AxiosPromise<T>): UsePostRequestReturnType<T, D> {
  const [data, setData] = useState<T>({} as T);

  const postData = useCallback(
    async (body: D) => {
      const { data } = await callbackfn(body);
      setData(data);
    },
    [callbackfn]
  );

  return [data, postData];
}

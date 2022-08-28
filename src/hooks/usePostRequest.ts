import { useCallback, useState } from 'react';

import { AxiosPromise } from 'axios';

export type PostDataFunction<D> = (body: D) => Promise<void>;

export type UsePostRequest<T, D> = [T | null, PostDataFunction<D>];

export default function usePostRequest<T, D>(callbackfn: (body: D) => AxiosPromise<T>): UsePostRequest<T, D> {
  const [data, setData] = useState<T | null>(null);

  const postData: PostDataFunction<D> = useCallback(
    async (data: D) => {
      const response = await callbackfn(data);
      setData(response.data);
    },
    [callbackfn]
  );

  return [data, postData];
}

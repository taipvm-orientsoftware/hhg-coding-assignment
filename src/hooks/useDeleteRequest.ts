import { useCallback, useState } from 'react';

import { AxiosPromise } from 'axios';

type UseDeleteRequest<T> = [T, (params: string) => Promise<void>];

export default function useDeleteRequest<T>(callbackfn: (id: string) => AxiosPromise<T>): UseDeleteRequest<T> {
  const [data, setData] = useState<T>({} as T);

  const deleteData = useCallback(
    async (params: string) => {
      const response = await callbackfn(params);
      setData(response.data);
    },
    [callbackfn]
  );

  return [data, deleteData];
}

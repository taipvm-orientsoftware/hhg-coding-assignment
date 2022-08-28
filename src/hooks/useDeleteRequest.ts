import { useCallback, useState } from 'react';

import { AxiosPromise } from 'axios';

export type DeleteDataFunction = (params: string) => Promise<void>;

export type UseDeleteRequest<T> = [T | null, DeleteDataFunction];

export default function useDeleteRequest<T>(callbackfn: (id: string) => AxiosPromise<T>): UseDeleteRequest<T> {
  const [data, setData] = useState<T | null>(null);

  const deleteData: DeleteDataFunction = useCallback(
    async (params: string) => {
      const response = await callbackfn(params);
      setData(response.data);
    },
    [callbackfn]
  );

  return [data, deleteData];
}

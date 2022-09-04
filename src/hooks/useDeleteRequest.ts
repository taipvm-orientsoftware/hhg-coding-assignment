import { useCallback, useState } from 'react';

import { AxiosResponse } from 'axios';

export type DeleteDataFunction = (id: string, params?: unknown) => Promise<void>;

export type UseDeleteRequest<T> = [T | null, DeleteDataFunction];

export default function useDeleteRequest<T>(
  callbackFn: (id: string, params?: unknown) => Promise<AxiosResponse<T>>
): UseDeleteRequest<T> {
  const [data, setData] = useState<T | null>(null);

  const deleteData: DeleteDataFunction = useCallback(
    async (id: string, params?: unknown) => {
      const response = await callbackFn(id, params);
      setData(response.data);
    },
    [callbackFn]
  );

  return [data, deleteData];
}

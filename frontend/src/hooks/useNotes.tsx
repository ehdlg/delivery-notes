import useSwr from 'swr';
import { FetchError } from '../errors';
import { API_URL } from '../constants';
import useToken from './useToken';

function useNotes<T>(resource: string) {
  const URL = `${API_URL}${resource}`;
  const { token } = useToken();

  if (null == token)
    throw new FetchError(
      'An error occurred while fetching the data',
      { error: 'No está autorizado' },
      401
    );

  const fetcher = async (url: string) => {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!res.ok) {
      const info = await res.json();
      const status = res.status;

      const error = new FetchError(
        'An error occurred while fetching the data.',
        info,
        status
      );

      throw error;
    }

    return res.json();
  };

  const { data, error, isLoading } = useSwr<T, FetchError>(URL, fetcher);

  return {
    data,
    error,
    isLoading
  };
}

export default useNotes;

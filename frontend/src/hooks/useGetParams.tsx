import { useSearchParams } from 'react-router-dom';
import { SearchParamKey } from '../types';

function useGetParams(): {
  search: string;
  filter: string;
  updateSearchParam: (key: SearchParamKey, value: string) => void;
} {
  const [searchParams, setSearchParams] = useSearchParams();

  function updateSearchParam(key: SearchParamKey, value: string) {
    if (value === '') {
      searchParams.delete(key);
    } else {
      searchParams.set(key, value);
    }

    setSearchParams(searchParams);
  }

  return {
    search: searchParams.get('search') ?? '',
    filter: searchParams.get('filter') ?? '',
    updateSearchParam
  };
}

export default useGetParams;

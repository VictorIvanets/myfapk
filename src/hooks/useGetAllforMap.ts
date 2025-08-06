import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { fishingServices } from 'src/services/fishing.services';
import { QUERY_KEY } from 'src/types/constants';
import type { ResponseForMapT } from 'src/types/fishing';
import type { LeafletViewCoordsT } from 'src/types/map.types';

const useGetAllforMap = () => {
  const { data, isError, error, isLoading } = useQuery<ResponseForMapT[]>({
    queryKey: [QUERY_KEY.ALL_FISH_FOR_MAP],
    queryFn: fishingServices.getAllforMap,
  });

  const markerData = useMemo((): LeafletViewCoordsT[] | undefined => {
    return data?.map((i): LeafletViewCoordsT => {
      return {
        lat: i.coords[0],
        lng: i.coords[1],
        id: i._id,
        description: i.description,
        title: i.title,
        score: i.score,
      };
    });
  }, [data]);

  return {
    data,
    markerData,
    isError,
    error,
    isLoading,
  };
};

export default useGetAllforMap;

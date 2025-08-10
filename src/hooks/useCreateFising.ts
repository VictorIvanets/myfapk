import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fishingServices } from 'src/services/fishing.services';
import { QUERY_KEY } from 'src/types/constants';
import { useAppNavigation } from './useAppNavigation';

const useCreateFising = () => {
  const { navigate } = useAppNavigation();

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: fishingServices.create,
    onError: error => {
      console.log(error);
    },
    onSuccess: response => {
      navigate('Details', { id: response._id });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.ALL_FISH],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.ALL_FISH_USER],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.ALL_FISH_FOR_MAP],
      });
    },
  });

  return {
    create: mutation.mutate,
    isLoading: mutation.isPending,
  };
};

export default useCreateFising;

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fishingServices } from 'src/services/fishing.services';
import { QUERY_KEY } from 'src/types/constants';

const useUpdateFising = (id: string | undefined) => {
  const mutation = useMutation({
    mutationFn: fishingServices.update,
    onError: error => {
      console.log(error);
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.PAID],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_ONE_FISHING, id],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.ALL_FISH_USER],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.ALL_FISH],
      });
    },
  });
  const queryClient = useQueryClient();

  return {
    updateFishing: mutation.mutate,
    isLoading: mutation.isPending,
  };
};

export default useUpdateFising;

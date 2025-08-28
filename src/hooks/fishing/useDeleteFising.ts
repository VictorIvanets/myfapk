import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fishingServices } from 'src/services/fishing.services';
import { QUERY_KEY } from 'src/types/constants';

const useDeleteFising = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: fishingServices.deleteItem,
    onError: error => {
      console.log(error);
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.ALL_FISH_USER],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.ALL_FISH],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.PAID],
      });
    },
  });

  return {
    deleteFising: mutation.mutate,
    isLoading: mutation.isPending,
  };
};

export default useDeleteFising;

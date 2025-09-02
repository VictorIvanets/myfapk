import { useMutation, useQueryClient } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import { fishingServices } from 'src/services/fishing.services';
import { QUERY_KEY } from 'src/types/constants';

const useDeleteFising = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: fishingServices.deleteItem,
    onError: error => {
      Toast.show({
        type: 'errorToast',
        text1: 'Помилка!',
        text2: error.message,
      });
    },
    onSuccess(response) {
      Toast.show({
        type: 'succssesToast',
        text1: `Запис: ${response.title}`,
        text2: 'видалено',
      });
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

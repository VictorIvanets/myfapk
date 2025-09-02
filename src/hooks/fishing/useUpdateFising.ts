import { useMutation, useQueryClient } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import { fishingServices } from 'src/services/fishing.services';
import { QUERY_KEY } from 'src/types/constants';

const useUpdateFising = (id: string | undefined) => {
  const mutation = useMutation({
    mutationFn: fishingServices.update,
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
        text2: 'оновлено',
      });
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

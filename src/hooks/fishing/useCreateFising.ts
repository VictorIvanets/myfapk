import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fishingServices } from 'src/services/fishing.services';
import { QUERY_KEY } from 'src/types/constants';
import { useAppNavigation } from '../useAppNavigation';
import Toast from 'react-native-toast-message';

const useCreateFising = () => {
  const { navigate } = useAppNavigation();

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: fishingServices.create,
    onError: error => {
      Toast.show({
        type: 'errorToast',
        text1: 'Помилка!',
        text2: error.message,
      });
    },
    onSuccess: response => {
      Toast.show({
        type: 'succssesToast',
        text1: `Запис: ${response.title}`,
        text2: 'створено',
      });
      navigate('Details', { id: response._id });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.ALL_FISH],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.PAID],
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

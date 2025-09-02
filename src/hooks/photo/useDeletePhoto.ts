import { useMutation, useQueryClient } from '@tanstack/react-query';
import { photoServices } from 'src/services/photo.services';
import { QUERY_KEY } from 'src/types/constants';
import Toast from 'react-native-toast-message';

const useDeletePhoto = (id: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (photoId: { photoId: string; setId: string }) => {
      Toast.show({
        type: 'loadingToast',
        text1: 'Видалення…',
        autoHide: false,
      });

      return await photoServices.deletePhoto(photoId);
    },
    onSuccess() {
      Toast.show({
        type: 'succssesToast',
        text1: 'Фото',
        text2: 'Видалено',
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_ONE_FISHING, id],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.LOAD_PHOTO, id],
      });
    },
    onError: error => {
      Toast.show({
        type: 'errorToast',
        text1: 'Помилка!',
        text2: error.message,
      });
    },
  });

  return {
    deletePhoto: mutation.mutateAsync,
  };
};

export default useDeletePhoto;

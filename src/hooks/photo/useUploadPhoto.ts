import { useMutation, useQueryClient } from '@tanstack/react-query';
import { photoServices } from 'src/services/photo.services';
import { QUERY_KEY } from 'src/types/constants';
import Toast from 'react-native-toast-message';
import type FormData from 'form-data';

const useUploadPhoto = (id: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (payload: { _id: string; formData: FormData }) => {
      Toast.show({
        type: 'loadingToast',
        text1: 'Завантаження...',
        autoHide: false,
      });
      return await photoServices.uploadPhoto(payload);
    },
    onSuccess() {
      Toast.show({
        type: 'succssesToast',
        text1: 'Фото',
        text2: 'Завантажено',
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
    uploadPhoto: mutation.mutateAsync,
  };
};

export default useUploadPhoto;

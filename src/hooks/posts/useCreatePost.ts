import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from 'src/types/constants';
import { postsServices } from 'src/services/posts.services';
import Toast from 'react-native-toast-message';

const useCreatePost = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: postsServices.create,
    onError: error => {
      Toast.show({
        type: 'errorToast',
        text1: 'Помилка!',
        text2: error.message,
      });
    },
    onSuccess: () => {
      Toast.show({
        type: 'succssesToast',
        text1: 'Успіх',
        text2: 'пост додано',
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.POST_GET_ALL],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.POST_GET_ALL_BY_USER],
      });
    },
  });

  return {
    create: mutation.mutate,
    isLoading: mutation.isPending,
  };
};

export default useCreatePost;

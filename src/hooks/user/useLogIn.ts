import { useMutation } from '@tanstack/react-query';
import { STORAGE_KEYS_ACCESS_TOKEN } from 'src/api/PREFIX';
import { saveState } from 'src/api/storage';
import { loginServices } from 'src/services/Login.services';
import type { LoginPayloadT } from 'src/types/auth.types';
import { useAppNavigation } from '../useAppNavigation';
import Toast from 'react-native-toast-message';

const useLogIn = () => {
  const mutation = useMutation({
    mutationFn: loginServices.login,
    onError: error => {
      Toast.show({
        type: 'errorToast',
        text1: 'Помилка входу!',
        text2: error.message,
      });
    },
  });
  const { mutate, isPending, error, isError } = mutation;
  const navigation = useAppNavigation();

  const logIn = (payload: LoginPayloadT) => {
    mutate(payload, {
      onSuccess(response) {
        Toast.show({
          type: 'succssesToast',
          text1: 'З поверненням',
          text2: response.login,
        });
        navigation.navigate('HomeTabs');
        saveState(response, STORAGE_KEYS_ACCESS_TOKEN);
      },
    });
  };
  return {
    logIn,
    isLoading: isPending,
    error,
    isError,
  };
};

export default useLogIn;

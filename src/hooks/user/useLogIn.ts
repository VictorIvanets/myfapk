import { useMutation } from '@tanstack/react-query';
import { STORAGE_KEYS_ACCESS_TOKEN } from 'src/api/PREFIX';
import { saveState } from 'src/api/storage';
import { loginServices } from 'src/services/Login.services';
import type { LoginPayloadT } from 'src/types/auth.types';
import { useAppNavigation } from '../useAppNavigation';
import { Alert } from 'react-native';

const useLogIn = () => {
  const mutation = useMutation({
    mutationFn: loginServices.login,
    onError: error => {
      Alert.alert(
        'ERROR',
        error.message,
        [
          { text: 'OK', onPress: () => console.log(error.message) },
          { text: 'Скасувати', style: 'cancel' },
        ],
        { cancelable: true },
      );
    },
  });
  const { mutate, isPending, error, isError } = mutation;
  const navigation = useAppNavigation();

  const logIn = (payload: LoginPayloadT) => {
    mutate(payload, {
      onSuccess(response) {
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

import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import InputField from 'src/components/InputField/InputField';
import Button from 'src/components/Button';
import Flex from 'src/components/Flex';
import Text from 'src/components/Text';
import { useAppNavigation } from 'src/hooks/useAppNavigation';
import useLogIn from 'src/hooks/user/useLogIn';
import type { UserLogInDataFields } from './userLogInSchema';
import { userLogInSchema } from './userLogInSchema';
import type { LoginPayloadT } from 'src/types/auth.types';
import { zodResolver } from '@hookform/resolvers/zod';
import cleanObjectStrings from 'src/helpers/cleanObjectStrings';

export default function Login() {
  const navigation = useAppNavigation();
  const { logIn } = useLogIn();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserLogInDataFields>({
    resolver: zodResolver(userLogInSchema),
    defaultValues: {
      login: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginPayloadT) => {
    logIn(cleanObjectStrings(data));
    reset();
  };

  return (
    <Flex flex center gap="s1">
      <Image
        source={require('../../../assets/images/logoMf-01.png')}
        style={styles.image}
      />
      <Text size="h4">Вхід в додаток </Text>
      <Flex center gap="s3" style={styles.container}>
        <Flex style={styles.inputs}>
          <Controller
            control={control}
            name="login"
            rules={{ required: 'Імʼя користувача обовʼязкове' }}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <InputField
                label="Імʼя користувача"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                error={errors.login ? errors.login?.message : error?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            rules={{ required: 'Пароль обовʼязковий' }}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <InputField
                label="Пароль"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                error={
                  errors.password ? errors.password?.message : error?.message
                }
                secureTextEntry
              />
            )}
          />
        </Flex>
        <Button view="max" title="Увійти" onPress={handleSubmit(onSubmit)} />
      </Flex>
      <Flex row gap="s10">
        <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
          <Text size="subtitle">Реєстрація</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Rules')}>
          <Text color="ACCENT" size="subtitle">
            Правила
          </Text>
        </TouchableOpacity>
      </Flex>
    </Flex>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    padding: 16,
  },
  inputs: {
    width: '100%',
  },
  image: {
    width: 160,
    height: 120,
    resizeMode: 'contain',
  },
});

import React from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Flex from 'src/components/Flex';
import Text from 'src/components/Text';
import type { UserRegisterDataFields } from './userRegisterSchema';
import { userRegisterSchema } from './userRegisterSchema';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useRegisterUser from 'src/hooks/useRegisterUser';
import type { RegisterPayloadT } from 'src/types/auth.types';
import Button from 'src/components/Button';
import InputField from 'src/components/InputField/InputField';
import { useAppNavigation } from 'src/hooks/useAppNavigation';
import { ScrollView } from 'react-native-gesture-handler';
import { colors } from 'src/theme/colors';
import cleanObjectStrings from 'src/helpers/cleanObjectStrings';

const Registration = () => {
  const { register, isLoading, error: regerror } = useRegisterUser();
  const navigation = useAppNavigation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserRegisterDataFields>({
    resolver: zodResolver(userRegisterSchema),
    defaultValues: {
      login: '',
      password: '',
      name: '',
      subname: '',
      country: '',
      city: '',
    },
  });

  const onSubmit = (payload: RegisterPayloadT) => {
    register(cleanObjectStrings(payload));
    reset();
  };

  return (
    <Flex flex style={styles.container}>
      <Flex row center gap="s5">
        <Image
          source={require('../../../assets/images/logoMf-01.png')}
          style={styles.image}
        />
        <Text size="h4">Реєстрація</Text>
      </Flex>
      {regerror && (
        <Text color="RED" center>
          {regerror.message}
        </Text>
      )}
      {isLoading ? (
        <ActivityIndicator size={100} color={colors.ACCENT} />
      ) : (
        <Flex flex center gap="s1">
          <ScrollView style={styles.inputs}>
            <Controller
              control={control}
              name="login"
              rules={{ required: 'Логін обовʼязковий' }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <InputField
                  label="Логін"
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
                />
              )}
            />
            <Controller
              control={control}
              name="name"
              rules={{ required: 'Ім’я є обов’язковим' }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <InputField
                  label="Ім’я"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  error={errors.name ? errors.name?.message : error?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="subname"
              rules={{ required: 'Прізвище є обов’язковим' }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <InputField
                  label="Прізвище"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  error={
                    errors.subname ? errors.subname?.message : error?.message
                  }
                />
              )}
            />
            <Controller
              control={control}
              name="country"
              rules={{ required: 'Країна є обов’язковим полем' }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <InputField
                  label="Країна"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  error={
                    errors.country ? errors.country?.message : error?.message
                  }
                />
              )}
            />
            <Controller
              control={control}
              name="city"
              rules={{ required: 'Місто є обов’язковим' }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <InputField
                  label="Місто"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  error={errors.city ? errors.city?.message : error?.message}
                />
              )}
            />
          </ScrollView>
          <Button
            view="max"
            title="Зареєструвати"
            onPress={handleSubmit(onSubmit)}
          />
        </Flex>
      )}
      <Flex center row gap="s10">
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text size="subtitle">Вхід</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Rules')}>
          <Text color="ACCENT" size="subtitle">
            Правила
          </Text>
        </TouchableOpacity>
      </Flex>
    </Flex>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 30,
  },
  inputs: {
    width: '100%',
  },
  image: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
  },
});

export default Registration;

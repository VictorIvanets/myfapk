import React from 'react';
import { Alert, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import InputField from 'src/components/InputField/InputField';
import Button from 'src/components/Button';
import Flex from 'src/components/Flex';
import Text from 'src/components/Text';
import { useAppNavigation } from 'src/hooks/useAppNavigation';

type FormData = {
  username: string;
  password: string;
};

export default function Login() {
  const navigation = useAppNavigation();

  const {
    control,
    handleSubmit,
    formState: {},
  } = useForm<FormData>({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = (data: FormData) => {
    console.log('Form Data:', data);
    Alert.alert(
      'Успіх',
      `Username: ${data.username}\nPassword: ${data.password}`,
    );
  };

  return (
    <Flex flex center gap="s4">
      <Image
        source={require('../../../assets/images/logoMf-01.png')}
        style={styles.image}
      />
      <Text size="h4">Вхід в додаток </Text>
      <Flex center gap="s3" style={styles.container}>
        <Flex style={styles.inputs}>
          <Controller
            control={control}
            name="username"
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
                error={error?.message}
                ibackground
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
                error={error?.message}
                ibackground
                secureTextEntry
              />
            )}
          />
        </Flex>
        <Button view="max" title="Увійти" onPress={handleSubmit(onSubmit)} />
      </Flex>
      <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
        <Text size="subtitle">Реєстрація</Text>
      </TouchableOpacity>
    </Flex>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    padding: 16,
    // gap: 12,
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

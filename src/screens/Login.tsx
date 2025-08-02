import React from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import InputField from 'src/components/InputField/InputField';
import Button from 'src/components/Button';

type FormData = {
  username: string;
  password: string;
};

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
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
    <View style={styles.container}>
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

      <Button title="Увійти" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
  },
});

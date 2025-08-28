import { zodResolver } from '@hookform/resolvers/zod';
import type { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, TouchableOpacity } from 'react-native';
import FadeInView from 'src/components/FadeInView';
import Flex from 'src/components/Flex';
import Text from 'src/components/Text';
import useCreateFising from 'src/hooks/fishing/useCreateFising';
import type { RootStackParamListT } from 'src/Navigatior/route';
import { getWeatherApi } from 'src/services/getWeather';
import type { WeatherT } from 'src/types/weather.types';
import type { AddFishingSchemaDataFields } from './addFishingSchema';
import { addFishingSchema } from './addFishingSchema';
import type { FishingPayloadT, PaidFishingT } from 'src/types/fishing';
import InputField from 'src/components/InputField/InputField';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import useUpdateFising from 'src/hooks/fishing/useUpdateFising';
import Button from 'src/components/Button';
import { useAppNavigation } from 'src/hooks/useAppNavigation';
import { ScrollView } from 'react-native-gesture-handler';
import useGetUserInfoInStorage from 'src/hooks/useGetUserInfoInStorage';
import { cleanStr } from 'src/helpers/cleanObjectStrings';

type Props = StackScreenProps<RootStackParamListT, 'CreateFishing'>;

const CreateFishing = ({ route }: Props) => {
  const { coords, updata } = route.params;
  const { navigate } = useAppNavigation();

  const [weather, setWeather] = useState<WeatherT | undefined>();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);
  const { create } = useCreateFising();
  const { updateFishing } = useUpdateFising(updata?._id);
  const currentUser = useGetUserInfoInStorage();

  const getWeather = async () => {
    if (coords) {
      const result = await getWeatherApi({ lat: coords.lat, lng: coords.lng });
      setWeather(result);
    }
  };

  useEffect(() => {
    !weather && getWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddFishingSchemaDataFields>({
    resolver: zodResolver(addFishingSchema),
    defaultValues: {
      title: updata ? updata.title : '',
      description: updata ? updata.description : '',
      score: updata ? updata.score : 0,
      date: updata ? updata.date : '',
      paidTitle: updata && updata.paid ? updata.paid?.title : '',
      paidOwner: updata && updata.paid ? updata.paid?.owner : '',
      paidPrise: updata && updata.paid ? updata.paid?.price : 0,
      paidContact: updata && updata.paid ? updata.paid?.contact.join(', ') : '',
    },
  });

  const submit = async (payload: {
    title: string;
    description: string;
    score: number;
    date: string;
    paidTitle: string;
    paidOwner: string;
    paidPrise: number;
    paidContact: string;
  }) => {
    if (weather && coords) {
      const paidFishing: PaidFishingT = {
        title: payload.paidTitle,
        price: payload.paidPrise,
        owner: payload.paidOwner,
        contact: cleanStr(payload.paidContact).split(', '),
      };

      const paramsFishing: FishingPayloadT = {
        title: payload.title.replace(/\s+/g, ' ').trim(),
        description: payload.description.replace(/\s+/g, ' ').trim(),
        score: payload.score,
        date: payload.date,
        coords: [coords.lat, coords.lng],
        img: [],
        weather: weather,
        paid:
          currentUser &&
          currentUser.login === 'admin' &&
          payload.paidTitle !== ''
            ? paidFishing
            : undefined,
      };
      create(paramsFishing);
    }
    reset();
  };

  const update = async (data: {
    title: string;
    description: string;
    score: number;
    date: string;
    paidTitle: string;
    paidOwner: string;
    paidPrise: number;
    paidContact: string;
  }) => {
    if (updata) {
      const paidFishing: PaidFishingT = {
        title: data.paidTitle,
        price: data.paidPrise,
        owner: data.paidOwner,
        contact: cleanStr(data.paidContact).split(', '),
      };

      const updateParamsFishing: Omit<
        FishingPayloadT,
        'coords' | 'img' | 'weather'
      > = {
        title: data.title.replace(/\s+/g, ' ').trim(),
        description: data.description.replace(/\s+/g, ' ').trim(),
        score: data.score,
        date: data.date,
        paid:
          currentUser && currentUser.login === 'admin' && updata.paid
            ? paidFishing
            : undefined,
      };
      const _id = updata?._id || '';
      const payload = { ...updata, ...updateParamsFishing };
      console.log('update', { _id, payload });
      updateFishing({ _id, payload });
      navigate('Details', { id: _id });
    }
    reset();
  };

  return (
    <FadeInView style={styles.container}>
      <ScrollView>
        <Flex flex gap="s5">
          <Flex flex>
            {updata ? (
              <Flex center>
                <Text color="ACCENT" size="h4" center>
                  Оновлення даних
                </Text>
                <Text center>
                  Ви можете оновити тільки назву, опис, оцінку та дату
                </Text>
                <Text center>Координати та погодні умови не змінюються</Text>
              </Flex>
            ) : (
              <Flex center>
                <Text color="ACCENT" size="h4" center>
                  Створіть запис про рибалку
                </Text>
                <Text size="subtitle" center>
                  Додайте назву, опис, оцінку та дату
                </Text>
                <Text size="subtitle" center>
                  В описі, бажано, перерахувати, {'\n'} що ловилося, та на що
                </Text>
                <Text size="subtitle" center>
                  Опис бажано робити українською, щоб був коректний пошук
                  ("короп", "товстолоб")
                </Text>
              </Flex>
            )}
          </Flex>

          <Flex gap="s1" style={styles.inputs}>
            <Controller
              control={control}
              name="title"
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <InputField
                  label="Назва"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  error={errors.title ? errors.title?.message : error?.message}
                  ibackground
                />
              )}
            />

            <Controller
              control={control}
              name="description"
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <InputField
                  label="Опис"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  error={
                    errors.description
                      ? errors.description?.message
                      : error?.message
                  }
                  ibackground
                />
              )}
            />
            <Controller
              control={control}
              name="date"
              render={({ field: { onChange, value } }) => (
                <>
                  <TouchableOpacity onPress={showDatePicker}>
                    <InputField
                      label="Дата"
                      value={
                        value ? moment(value).format('YYYY-MM-DDTHH:mm') : ''
                      }
                      editable={false}
                      error={errors.date?.message}
                    />
                  </TouchableOpacity>

                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    date={value ? new Date(value) : new Date()}
                    onConfirm={date => {
                      onChange(moment(date).format('YYYY-MM-DDTHH:mm'));
                      hideDatePicker();
                    }}
                    onCancel={hideDatePicker}
                  />
                </>
              )}
            />

            <Controller
              control={control}
              name="score"
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <InputField
                  keyboardType="numeric"
                  label="Оцінка"
                  onChangeText={text => onChange(Number(text))}
                  onBlur={onBlur}
                  value={value.toString()}
                  error={errors.score ? errors.score?.message : error?.message}
                  ibackground
                />
              )}
            />
            {currentUser && currentUser.login === 'admin' && (
              <>
                <Text color="ACCENT" size="h4" center>
                  Данні для платних рибалок
                </Text>
                <Controller
                  control={control}
                  name="paidTitle"
                  render={({
                    field: { onChange, onBlur, value },
                    // fieldState: { error },
                  }) => (
                    <InputField
                      label="Назва Місця"
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                      // error={errors.title ? errors.title?.message : error?.message}
                      ibackground
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="paidOwner"
                  render={({
                    field: { onChange, onBlur, value },
                    // fieldState: { error },
                  }) => (
                    <InputField
                      label="Власник"
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                      // error={errors.title ? errors.title?.message : error?.message}
                      ibackground
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="paidContact"
                  render={({
                    field: { onChange, onBlur, value },
                    // fieldState: { error },
                  }) => (
                    <InputField
                      label="Контакти через ', '"
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                      // error={errors.title ? errors.title?.message : error?.message}
                      ibackground
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="paidPrise"
                  render={({
                    field: { onChange, onBlur, value },
                    // fieldState: { error },
                  }) => (
                    <InputField
                      keyboardType="numeric"
                      label="Ціна"
                      onChangeText={text => onChange(Number(text))}
                      onBlur={onBlur}
                      value={value.toString()}
                      // error={
                      //   errors.score ? errors.score?.message : error?.message
                      // }
                      ibackground
                    />
                  )}
                />
              </>
            )}
          </Flex>
        </Flex>
      </ScrollView>
      <Flex center>
        <Button
          view="max"
          title={updata ? 'Оновити' : 'Створити'}
          onPress={handleSubmit(updata ? update : submit)}
          style={styles.btn}
        />
      </Flex>
    </FadeInView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    gap: 25,
  },
  inputs: {
    width: '100%',
  },
  btn: {
    marginTop: 25,
  },
});

export default CreateFishing;

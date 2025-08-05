import { zodResolver } from '@hookform/resolvers/zod';
import type { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, TouchableOpacity } from 'react-native';
import FadeInView from 'src/components/FadeInView';
import Flex from 'src/components/Flex';
import Text from 'src/components/Text';
import useCreateFising from 'src/hooks/useCreateFising';
import type { RootStackParamListT } from 'src/Navigatior/route';
import { getWeatherApi } from 'src/services/getWeather';
import type { WeatherT } from 'src/types/weather.types';
import type { AddFishingSchemaDataFields } from './addFishingSchema';
import { addFishingSchema } from './addFishingSchema';
import type { FishingPayloadT } from 'src/types/fishing';
import InputField from 'src/components/InputField/InputField';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import useUpdateFising from 'src/hooks/useUpdateFising';
import Button from 'src/components/Button';

type Props = StackScreenProps<RootStackParamListT, 'CreateFishing'>;

const CreateFishing = ({ route }: Props) => {
  const { coords, updata } = route.params;
  const [weather, setWeather] = useState<WeatherT | undefined>();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);
  const { create } = useCreateFising();
  const { updateFishing } = useUpdateFising();

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
    },
  });

  const submit = async (payload: {
    title: string;
    description: string;
    score: number;
    date: string;
  }) => {
    if (weather && coords) {
      const paramsFishing: FishingPayloadT = {
        title: payload.title.replace(/\s+/g, ' ').trim(),
        description: payload.description.replace(/\s+/g, ' ').trim(),
        score: payload.score,
        date: payload.date,
        coords: [coords.lat, coords.lng],
        img: [],
        weather: weather,
      };
      console.log(paramsFishing);
      //   create(paramsFishing);
      //   navigate(`/mypage`);
    }
    reset();
  };

  const update = async (data: {
    title: string;
    description: string;
    score: number;
    date: string;
  }) => {
    if (updata) {
      const updateParamsFishing: Omit<
        FishingPayloadT,
        'coords' | 'img' | 'weather'
      > = {
        title: data.title.replace(/\s+/g, ' ').trim(),
        description: data.description.replace(/\s+/g, ' ').trim(),
        score: data.score,
        date: data.date,
      };
      const _id = updata?._id || '';
      const payload = { ...updata, ...updateParamsFishing };
      console.log({ _id, payload });
      //   updateFishing({ _id, payload });
      // navigate(`/details/${updata._id}`);
    }
    reset();
  };

  return (
    <FadeInView style={styles.container}>
      {updata ? (
        <Flex center>
          <Text color="ACCENT" size="h4" center>
            Оновлення даних
          </Text>
          <Text center>
            Ви можете оновити тільки назву, опис, оцінку та дату
          </Text>
          <Text center>Координати та погодні умови не змінюються</Text>Text
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
            Опис бажано робити українською, щоб був коректний пошук ("короп",
            "товстолоб")
          </Text>
        </Flex>
      )}
      <Flex style={styles.inputs}>
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
                  value={value ? moment(value).format('YYYY-MM-DDTHH:mm') : ''}
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
        <Button
          view="max"
          title={updata ? 'Оновити' : 'Створити'}
          onPress={handleSubmit(updata ? update : submit)}
        />
      </Flex>
    </FadeInView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
    gap: 15,
  },
  inputs: {
    width: '100%',
  },
});

export default CreateFishing;

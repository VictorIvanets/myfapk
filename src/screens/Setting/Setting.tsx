import MaterialIcons from '@react-native-vector-icons/material-icons';
import MaterialDIcons from '@react-native-vector-icons/material-design-icons';
import React, { useEffect, useState } from 'react';
import { Linking, StyleSheet } from 'react-native';
import { STORAGE_KEYS_ACCESS_TOKEN } from 'src/api/PREFIX';
import { clearState } from 'src/api/storage';
import Button from 'src/components/Button';
import FadeInView from 'src/components/FadeInView';
import Flex from 'src/components/Flex';
import ScaleInPressable from 'src/components/ScaleInPressable';
import Text from 'src/components/Text';
import normalizeMongoDate from 'src/helpers/normalizeMongoDate';
import { useAppNavigation } from 'src/hooks/useAppNavigation';
import useGetUserInfo from 'src/hooks/user/useGetUserInfo';
import { colors } from 'src/theme/colors';
import Weather from 'src/features/Weather/Weather';
import type { WeatherT } from 'src/types/weather.types';
import { getWeatherApi } from 'src/services/getWeather';
import type { LeafletViewCoordsT } from 'src/types/map.types';
import { requestLocationPermission } from '../Map/requestLocationPermission';

const Setting = () => {
  const navigation = useAppNavigation();
  const { userInfo } = useGetUserInfo();
  const [checkExit, setCheckExit] = useState(false);
  const [weather, setWeather] = useState<WeatherT | undefined>();
  const [location, setLocation] = useState<LeafletViewCoordsT | null>(null);

  const getWeather = async () => {
    if (location) {
      const result = await getWeatherApi({
        lat: location.lat,
        lng: location.lng,
      });
      setWeather(result);
    }
  };

  useEffect(() => {
    requestLocationPermission(setLocation);
  }, []);

  useEffect(() => {
    location && getWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const exit = () => {
    clearState(STORAGE_KEYS_ACCESS_TOKEN);
    navigation.navigate('Login');
  };

  return (
    <FadeInView style={styles.container}>
      <Flex flex gap="s10" style={styles.container}>
        <Flex style={styles.account} gap="s8">
          <Flex centerH>
            <Text color="ACCENT" size="Bheadline">
              Інформація про користувача
            </Text>
          </Flex>
          <Flex gap="s1">
            <MaterialIcons
              name="account-circle"
              size={30}
              color={colors.WHITE}
            />
            <Text>Логін: {userInfo?.login}</Text>
            <Text>Ім'я: {userInfo?.name}</Text>
            <Text>Прізвище: {userInfo?.subname}</Text>
            <Text>Місто: {userInfo?.city}</Text>
            <Text>Країна: {userInfo?.country}</Text>
            <Text color="ACCENT">
              Дата реєстрації: {normalizeMongoDate(userInfo?.createdAt || '')}
            </Text>
          </Flex>
        </Flex>
        <Flex gap="s5">
          <ScaleInPressable
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Flex row centerH gap="s2">
              <MaterialIcons
                name="exit-to-app"
                size={30}
                color={colors.WHITE}
              />
              <Text>Повернутись назад</Text>
            </Flex>
          </ScaleInPressable>
          <ScaleInPressable
            onPress={() => {
              navigation.navigate('Rules');
            }}
          >
            <Flex row centerH gap="s2">
              <MaterialIcons
                name="info-outline"
                size={30}
                color={colors.WHITE}
              />
              <Text>Правила</Text>
            </Flex>
          </ScaleInPressable>
          <ScaleInPressable onPress={() => setCheckExit(true)}>
            <Flex row centerH gap="s2">
              <MaterialDIcons
                name="location-exit"
                size={30}
                color={colors.WHITE}
              />
              <Text>Вийти з додатка</Text>
            </Flex>
          </ScaleInPressable>
          <ScaleInPressable
            onPress={() => Linking.openURL('mailto:imperia.zt@gmail.com')}
          >
            <Flex row centerH gap="s2">
              <MaterialDIcons
                name="email-arrow-right-outline"
                size={30}
                color={colors.WHITE}
              />
              <Text>Написати адміністратору</Text>
            </Flex>
          </ScaleInPressable>
          <ScaleInPressable
            onPress={() =>
              Linking.openURL('https://victorivanets.github.io/myfapp')
            }
          >
            <Flex row centerH gap="s2">
              <MaterialDIcons name="web" size={30} color={colors.WHITE} />
              <Text>Веб-версія</Text>
            </Flex>
          </ScaleInPressable>
          <Weather warn data={weather} />
        </Flex>
      </Flex>
      {checkExit && (
        <Flex center gap="s4" abs style={styles.exit}>
          <Text>Ви дійсно хочете вийти?</Text>
          <Flex center gap="s10" row>
            <Button
              onPress={() => {
                exit();
                setCheckExit(false);
              }}
              view="small"
              title="ТАК"
            />
            <Button
              onPress={() => setCheckExit(false)}
              view="small"
              title="НІ"
            />
          </Flex>
        </Flex>
      )}
    </FadeInView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    position: 'relative',
  },
  account: {
    borderBottomColor: colors.SECOND,
    borderBottomWidth: 2,
    paddingBottom: 25,
  },
  exit: {
    zIndex: 100,
    width: 700,
    height: '100%',
    backgroundColor: colors.SECOND50,
    borderRadius: 10,
    top: '50%',
    left: '52%',
    transform: [{ translateX: '-50%' }, { translateY: '-50%' }],
  },
});

export default Setting;

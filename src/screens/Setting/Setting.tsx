import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { STORAGE_KEYS_ACCESS_TOKEN } from 'src/api/PREFIX';
import { clearState } from 'src/api/storage';
import Button from 'src/components/Button';
import FadeInView from 'src/components/FadeInView';
import Flex from 'src/components/Flex';
import Text from 'src/components/Text';
import normalizeMongoDate from 'src/helpers/normalizeMongoDate';
import { useAppNavigation } from 'src/hooks/useAppNavigation';
import useGetUserInfo from 'src/hooks/user/useGetUserInfo';
import { colors } from 'src/theme/colors';

const Setting = () => {
  const navigation = useAppNavigation();
  const { userInfo } = useGetUserInfo();
  const [checkExit, setCheckExit] = useState(false);

  const exit = () => {
    clearState(STORAGE_KEYS_ACCESS_TOKEN);
    navigation.navigate('Login');
  };

  return (
    <FadeInView style={styles.container}>
      <Flex centerH flex spread gap="s10" style={styles.container}>
        <Flex gap="s8">
          <Flex centerH>
            <Text size="h4">Інформація про користувача</Text>
          </Flex>
          <Flex>
            <Text size="headline" color="ACCENT">
              Ім'я:
            </Text>
            <Text size="headline">{userInfo?.name}</Text>
            <Text color="ACCENT">Прізвище:</Text>
            <Text size="headline">{userInfo?.subname}</Text>
            <Text color="ACCENT">Логін:</Text>
            <Text size="headline">{userInfo?.login}</Text>
            <Text color="ACCENT">Місто:</Text>
            <Text size="headline">{userInfo?.city}</Text>
            <Text color="ACCENT">Країна:</Text>
            <Text size="headline">{userInfo?.country}</Text>
          </Flex>
          <Flex>
            <Text color="ACCENT">Дата реєстрації:</Text>
            <Text size="caption">
              {normalizeMongoDate(userInfo?.createdAt || '')}
            </Text>
          </Flex>
        </Flex>

        <Flex rel center>
          <Button title="вийти з додатку" onPress={() => setCheckExit(true)} />
        </Flex>
        <Flex center>
          <Button
            title="продовжити"
            onPress={() => {
              navigation.navigate('HomeTabs');
            }}
          />
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

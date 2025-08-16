import React from 'react';
import { Linking, StyleSheet } from 'react-native';
import type { TabProps } from './types';
import Flex from 'src/components/Flex';
import Text from 'src/components/Text';
import { colors } from 'src/theme/colors';
import ScaleInPressable from 'src/components/ScaleInPressable';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import Weather from 'src/features/Weather/Weather';
import { ScrollView } from 'react-native-gesture-handler';

const InfoTab = ({ data }: TabProps) => {
  const openGoogleMaps = () => {
    if (!data) return;
    const url = `https://www.google.com/maps?ll=${data.coords[0]},${data.coords[1]}&q=${data.coords[0]},${data.coords[1]}`;
    Linking.openURL(url).catch(err =>
      console.error('Не вдалося відкрити посилання', err),
    );
  };

  const callNumber = (phone: string) => {
    const url = `tel:${phone}`;
    Linking.openURL(url).catch(err =>
      console.error('Не вдалося відкрити набір номера', err),
    );
  };

  const dateNormalize = data?.date.slice(0, 10).split('-').reverse().join('-');
  console.log(data?.paid?.contact);
  return (
    <Flex spread style={styles.container}>
      <ScrollView>
        <Flex gap="s8">
          <Flex gap="s5">
            <Flex gap="s2">
              <Text size="caption" color="TEXTDARK">
                Опис:
              </Text>
              <Text color="TEXT">{data?.description}</Text>
            </Flex>
          </Flex>
        </Flex>
      </ScrollView>
      {data?.paid ? (
        <>
          <Flex style={styles.info} gap="s2">
            <Text color="ACCENT" size="headline">
              {data.paid.title}
            </Text>
            <Text size="caption">Власник: {data.paid.owner}</Text>
            <Text size="headline" color="ACCENT">
              Ціна: {data.paid.price}
            </Text>
            <Text size="caption" color="ACCENT">
              Контакти
            </Text>
            {data.paid.contact &&
              data.paid.contact.map((i, index) => (
                <Text
                  onLongPress={() => callNumber(i)}
                  key={index}
                  size="captionbig"
                  color="ACCENT"
                >
                  ☎ {i}
                </Text>
              ))}
          </Flex>
        </>
      ) : (
        <>
          <Flex style={styles.info} gap="s2">
            <Text color="ACCENT" size="caption">
              Дата створення: {dateNormalize}
            </Text>
            <Text size="caption" color="TEXTDARK">
              Створив: {data?.userName}
            </Text>
            <Text size="caption" color="ACCENT">
              Оцінка: {data?.score}
            </Text>
          </Flex>
          <Weather data={data?.weather} />
        </>
      )}
      <Flex>
        <ScaleInPressable onPress={openGoogleMaps}>
          <Flex row center>
            <MaterialIcons
              name="location-pin"
              size={50}
              color={colors.ACCENT}
            />
            <Text>GOOGLE MAP</Text>
          </Flex>
        </ScaleInPressable>
      </Flex>
    </Flex>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  info: {
    marginVertical: 10,
  },
});

export default InfoTab;

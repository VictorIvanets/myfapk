import React from 'react';
import { Linking, StyleSheet } from 'react-native';
import type { TabProps } from './types';
import Flex from 'src/components/Flex';
import Text from 'src/components/Text';
import { colors } from 'src/theme/colors';
import ScaleInPressable from 'src/components/ScaleInPressable';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import Weather from 'src/components/Weather/Weather';
import { ScrollView } from 'react-native-gesture-handler';

const InfoTab = ({ data }: TabProps) => {
  const openGoogleMaps = () => {
    if (!data) return;
    const url = `https://www.google.com/maps?ll=${data.coords[0]},${data.coords[1]}&q=${data.coords[0]},${data.coords[1]}`;
    Linking.openURL(url).catch(err =>
      console.error('Не вдалося відкрити посилання', err),
    );
  };

  const dateNormalize = data?.date.slice(0, 10).split('-').reverse().join('-');

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

            <Flex gap="s2">
              <Text size="caption">Дата створення: {dateNormalize}</Text>
              <Text size="caption" color="TEXTDARK">
                Створив: {data?.userName}
              </Text>
              <Text size="caption" color="ACCENT">
                Оцінка: {data?.score}
              </Text>
            </Flex>
          </Flex>

          <Weather data={data?.weather} />
        </Flex>
      </ScrollView>

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
});

export default InfoTab;

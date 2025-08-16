import React from 'react';
import { Linking, Pressable, StyleSheet } from 'react-native';
import type { TabProps } from './types';
import Flex from 'src/components/Flex';
import Text from 'src/components/Text';
import { colors } from 'src/theme/colors';
import ScaleInPressable from 'src/components/ScaleInPressable';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import Weather from 'src/features/Weather/Weather';
import { ScrollView } from 'react-native-gesture-handler';
import { useAppNavigation } from 'src/hooks/useAppNavigation';
import type { LeafletViewCoordsT } from 'src/types/map.types';
import Ionicons from 'react-native-vector-icons/Ionicons';

const InfoTab = ({ data }: TabProps) => {
  const navigation = useAppNavigation();

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
  const viewToMap: LeafletViewCoordsT = {
    id: data?._id,
    lat: data?.coords[0] || 0,
    lng: data?.coords[1] || 0,
    title: data?.title,
  };

  const dateNormalize = data?.date.slice(0, 10).split('-').reverse().join('-');

  return (
    <Flex spread style={styles.container}>
      <ScrollView>
        <Pressable
          onLongPress={() =>
            navigation.navigate('CreateFishing', { updata: data })
          }
        >
          <Flex flex gap="s2">
            <Text size="caption" color="TEXTDARK">
              Опис:
            </Text>
            <Text color="TEXT">{data?.description}</Text>
          </Flex>
        </Pressable>
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
      <Flex row center gap="s8">
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
        <ScaleInPressable
          onPress={() =>
            navigation.navigate('Map', {
              coords: viewToMap,
            })
          }
        >
          <Flex row gap="s2" center>
            <Ionicons name="map-sharp" size={50} color={colors.ACCENT} />
            <Text>КАРТА</Text>
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

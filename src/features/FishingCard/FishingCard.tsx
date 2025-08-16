import React, { useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { PREFIX_STATIC } from 'src/api/PREFIX';
import Flex from 'src/components/Flex';
import ScaleInPressable from 'src/components/ScaleInPressable';
import Text from 'src/components/Text';
import { useAppNavigation } from 'src/hooks/useAppNavigation';
import { colors } from 'src/theme/colors';
import type { OneFishingT } from 'src/types/fishing';
import useDeleteFising from 'src/hooks/useDeleteFising';
import useGetUserInfoInStorage from 'src/hooks/useGetUserInfoInStorage';
import Button from 'src/components/Button';
export const DEFAULT_IMG =
  'https://kartinkof.club/uploads/posts/2022-05/1652635208_1-kartinkof-club-p-kartinki-subbota-ribalka-1.jpg';

type FishingCardProps = {
  item: OneFishingT;
};

const FishingCard = ({ item }: FishingCardProps) => {
  const navigation = useAppNavigation();
  const IMG = `${PREFIX_STATIC}static/${item.img[0]?.url}`;
  const dateNormalize = item.date.slice(0, 10).split('-').reverse().join('-');
  const [deleteItem, setDeleteItem] = useState(false);
  const { deleteFising } = useDeleteFising();
  const user = useGetUserInfoInStorage();

  return (
    <ScaleInPressable
      disabled={deleteItem}
      onLongPress={() => user?._id === item?.userId && setDeleteItem(true)}
      onPress={() => navigation.navigate('Details', { id: item._id })}
    >
      <Flex rel center flex style={styles.item}>
        <Flex abs style={styles.content}>
          <Text color="TEXTDARK">Назва/Місце:</Text>
          <Text size="Bheadline">{item.title}</Text>
          <Text color="TEXT" numberOfLines={1} ellipsizeMode="tail">
            {item.description}
          </Text>
        </Flex>
        <Flex abs style={styles.user}>
          <Text>Додав: {item.userName}</Text>
        </Flex>
        <Flex abs style={styles.rating}>
          <Text size="caption">
            <Ionicons name="star" size={14} color={colors.ACCENT} />{' '}
            {item.score}
          </Text>
        </Flex>
        <Flex abs style={styles.date}>
          <Text color="ACCENT" size="caption">
            Дата: {dateNormalize}
          </Text>
        </Flex>

        <Flex abs style={styles.imagebox}>
          <Image
            source={{ uri: item.img[0] ? IMG : DEFAULT_IMG }}
            style={styles.image}
          />
        </Flex>
        {deleteItem && (
          <Flex center gap="s4" abs style={styles.delete}>
            <Text>Ви дійсно хочете видалити цей запис?</Text>
            <Flex center gap="s10" row>
              <Button
                onPress={() => {
                  deleteFising(item._id);
                  setDeleteItem(false);
                }}
                view="small"
                title="ТАК"
              />
              <Button
                onPress={() => setDeleteItem(false)}
                view="small"
                title="НІ"
              />
            </Flex>
          </Flex>
        )}
      </Flex>
    </ScaleInPressable>
  );
};

const styles = StyleSheet.create({
  item: {
    width: '100%',
    height: 130,
    backgroundColor: colors.BLUE50,
    overflow: 'hidden',
    borderRadius: 11,
    borderColor: colors.SECOND50,
    borderWidth: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imagebox: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  content: {
    padding: 10,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 10,
    backgroundColor: colors.MAIN50,
  },
  user: {
    backgroundColor: colors.BLUE50,
    padding: 5,
    borderRadius: 10,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 0,
    top: 0,
    right: 0,
    zIndex: 11,
  },
  rating: {
    bottom: 0,
    right: 0,
    zIndex: 11,
    backgroundColor: colors.MAIN50,
    padding: 5,
    borderRadius: 10,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  date: {
    bottom: 0,
    left: 0,
    zIndex: 11,
    backgroundColor: colors.MAIN50,
    padding: 5,
    paddingLeft: 10,
    borderRadius: 10,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 0,
  },
  delete: {
    zIndex: 100,
    width: '100%',
    height: 130,
    backgroundColor: colors.SECOND,
    borderRadius: 10,
    top: '50%',
    left: '50%',
    transform: [{ translateX: '-50%' }, { translateY: '-50%' }],
  },
});

export default FishingCard;

import React, { useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import ScaleInPressable from '../ScaleInPressable';
import Button from '../Button';
import Flex from '../Flex';
import { colors } from 'src/theme/colors';
import { PREFIX_STATIC } from 'src/api/PREFIX';
import type { ResponseGetPhoto } from 'src/types/photo.types';
import type { OneFishingT } from 'src/types/fishing';
import useDeletePhoto from 'src/hooks/useDeletePhoto';
import Text from '../Text';

type Props = {
  data: OneFishingT;
  item: ResponseGetPhoto;
};

const PhotoItem = ({ item, data }: Props) => {
  const [deleteItem, setDeleteItem] = useState(false);
  const { deletePhoto } = useDeletePhoto(data._id);
  return (
    <ScaleInPressable
      disabled={deleteItem}
      onLongPress={() => setDeleteItem(true)}
      style={styles.imagebox}
    >
      <Image
        source={{
          uri: `${PREFIX_STATIC}static/${data._id}/${item.originalname}`,
        }}
        style={styles.image}
      />
      {deleteItem && (
        <Flex center gap="s4" abs style={styles.delete}>
          <Text>Ви дійсно хочете видалити це фото?</Text>
          <Flex center gap="s10" row>
            <Button
              onPress={() =>
                deletePhoto({
                  photoId: item._id,
                  setId: data._id,
                })
              }
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
    </ScaleInPressable>
  );
};

const styles = StyleSheet.create({
  imagebox: {
    width: '100%',
    height: 400,
    marginBottom: 20,
    backgroundColor: colors.SECOND20,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 400,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  delete: {
    width: 300,
    height: 130,
    backgroundColor: colors.SECOND50,
    borderRadius: 10,
    top: '50%',
    left: '50%',
    transform: [{ translateX: '-50%' }, { translateY: '-50%' }],
  },
});

export default PhotoItem;

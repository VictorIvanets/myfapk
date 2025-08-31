import React, { useState } from 'react';
import { StyleSheet, Pressable, Image } from 'react-native';
import { colors } from 'src/theme/colors';
import { PREFIX_STATIC } from 'src/api/PREFIX';
import type { ResponseGetPhoto } from 'src/types/photo.types';
import type { OneFishingT } from 'src/types/fishing';
import useDeletePhoto from 'src/hooks/photo/useDeletePhoto';
import Flex from 'src/components/Flex';
import Button from 'src/components/Button';
import Text from 'src/components/Text';
import useCheckAccess from 'src/helpers/useCheckAccess';
import ResizableImage from './ResizebleImage';

type Props = {
  data: OneFishingT;
  item: ResponseGetPhoto;
  setScrollEnabled: (val: boolean) => void;
};

const PhotoItem = ({ item, data, setScrollEnabled }: Props) => {
  const [deleteItem, setDeleteItem] = useState(false);
  const [resizeImg, setResizeImg] = useState(false);
  const { deletePhoto } = useDeletePhoto(data._id);
  const access = useCheckAccess(data?.userId);

  return (
    <Pressable
      onPress={() => {
        setScrollEnabled(resizeImg);
        setResizeImg(!resizeImg);
      }}
      disabled={deleteItem}
      onLongPress={() => access && setDeleteItem(true)}
      // eslint-disable-next-line react-native/no-inline-styles
      style={[styles.imagebox, { height: resizeImg ? 600 : 400 }]}
    >
      {resizeImg ? (
        <Flex style={styles.resizeImg} center abs>
          <ResizableImage
            uri={`${PREFIX_STATIC}static/${data._id}/${item.originalname}`}
          />
        </Flex>
      ) : (
        <Image
          source={{
            uri: `${PREFIX_STATIC}static/${data._id}/${item.originalname}`,
          }}
          style={styles.image}
        />
      )}
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
    </Pressable>
  );
};

const styles = StyleSheet.create({
  imagebox: {
    width: '100%',
    marginBottom: 20,
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
  resizeImg: {
    inset: 0,
  },
});

export default PhotoItem;

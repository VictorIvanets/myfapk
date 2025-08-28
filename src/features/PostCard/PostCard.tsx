import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import Flex from 'src/components/Flex';
import ScaleInPressable from 'src/components/ScaleInPressable';
import Text from 'src/components/Text';
import { useAppNavigation } from 'src/hooks/useAppNavigation';
import { colors } from 'src/theme/colors';
import useGetUserInfoInStorage from 'src/hooks/useGetUserInfoInStorage';
import Button from 'src/components/Button';
import type { PostT } from 'src/types/posts.types';
import useDeletePost from 'src/hooks/posts/useDeletePost';

type PostCardProps = {
  item: PostT;
};

const PostCard = ({ item }: PostCardProps) => {
  const navigation = useAppNavigation();
  const [deleteItem, setDeleteItem] = useState(false);
  const { deletePost } = useDeletePost();
  const user = useGetUserInfoInStorage();

  return (
    <ScaleInPressable
      disabled={deleteItem}
      onLongPress={() => user?._id === item?.userId && setDeleteItem(true)}
      //   onPress={() => navigation.navigate('Details', { id: item._id })}
    >
      <Flex rel flex style={styles.item}>
        <Flex
          flex
          center
          style={[{ backgroundColor: item.colorSchema }, styles.content]}
        >
          <Text center size="Bh3">
            {item.description}
          </Text>
        </Flex>
        <Text size="Bheadline">{item.userLogin}</Text>

        {deleteItem && (
          <Flex center gap="s4" abs style={styles.delete}>
            <Text>Ви дійсно хочете видалити цей запис?</Text>
            <Flex center gap="s10" row>
              <Button
                onPress={() => {
                  deletePost(item._id);
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
    borderColor: colors.ORANGE,
    borderWidth: 1,
    paddingBottom: 10,
  },
  content: {
    width: '100%',
    minHeight: 200,
    paddingHorizontal: 20,
    paddingVertical: 40,
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

export default PostCard;

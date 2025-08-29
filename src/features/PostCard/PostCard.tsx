import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import Flex from 'src/components/Flex';
import ScaleInPressable from 'src/components/ScaleInPressable';
import Text from 'src/components/Text';
import { useAppNavigation } from 'src/hooks/useAppNavigation';
import { colors } from 'src/theme/colors';
import Button from 'src/components/Button';
import type { PostT } from 'src/types/posts.types';
import useDeletePost from 'src/hooks/posts/useDeletePost';
import normalizeMongoDate from 'src/helpers/normalizeMongoDate';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colorSchemaCard from './colorSchemaCard';
import useCheckAccess from 'src/helpers/useCheckAccess';

type PostCardProps = {
  item: PostT;
};

const PostCard = ({ item }: PostCardProps) => {
  const navigation = useAppNavigation();
  const [deleteItem, setDeleteItem] = useState(false);
  const { deletePost } = useDeletePost();
  const access = useCheckAccess(item?.userId);
  const { background, text } = colorSchemaCard(item.colorSchema);

  return (
    <ScaleInPressable
      disabled={deleteItem}
      onLongPress={() => access && setDeleteItem(true)}
      onPress={() => navigation.navigate('PostDetails', { id: item._id })}
    >
      <Flex rel flex style={styles.item}>
        <Flex bg={background} flex center style={styles.content}>
          <Text color={text} center size="Bh3">
            {item.description}
          </Text>
        </Flex>
        <Flex row spread style={styles.footer}>
          <Text size="subtitler">{item.userLogin}</Text>
          <Flex row gap="s1">
            <FontAwesome name="comment" size={15} color={colors.TEXT} />
            <Text size="subtitler">{item.commentCount}</Text>
          </Flex>
          <Text size="subtitler">{normalizeMongoDate(item.createdAt)}</Text>
        </Flex>

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
    borderColor: colors.TEXTDARK,
    borderBottomWidth: 1,
    paddingBottom: 10,
    backgroundColor: colors.SECOND50,
  },
  content: {
    width: '100%',
    minHeight: 200,
    paddingHorizontal: 20,
    paddingVertical: 40,
    marginBottom: 10,
  },
  footer: {
    paddingHorizontal: 5,
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

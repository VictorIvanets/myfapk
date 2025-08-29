import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import Button from 'src/components/Button';
import Flex from 'src/components/Flex';
import ScaleInPressable from 'src/components/ScaleInPressable';
import Text from 'src/components/Text';
import useCheckAccess from 'src/helpers/useCheckAccess';
import normalizeMongoDate from 'src/helpers/normalizeMongoDate';
import { colors } from 'src/theme/colors';
import type { CommentPostT } from 'src/types/posts.types';
import useDeletePostComment from 'src/hooks/comment_post/useDeletePostComment';

interface CardProps {
  item: CommentPostT;
  postId: string;
}
const PostCommentCard = ({ item, postId }: CardProps) => {
  const [deleteItem, setDeleteItem] = useState(false);
  const { deleteComment } = useDeletePostComment(item.postId);
  const access = useCheckAccess(item.useId);

  const delComment = () => {
    if (access) {
      setDeleteItem(true);
    } else return;
  };

  return (
    <ScaleInPressable
      style={styles.box}
      onLongPress={delComment}
      disabled={deleteItem}
    >
      <Flex rel style={styles.container}>
        <Text>{item.comment}</Text>

        <Flex abs style={styles.date}>
          <Text size="subtitler">
            {item.login}, {normalizeMongoDate(item.createdAt)}
          </Text>
        </Flex>
      </Flex>
      {deleteItem && (
        <Flex center gap="s4" abs style={styles.delete}>
          <Text>Ви дійсно хочете видалити коментар?</Text>
          <Flex center gap="s10" row>
            <Button
              onPress={() => deleteComment({ commentId: item._id, postId })}
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
  box: {
    position: 'relative',
  },
  container: {
    padding: 20,
    backgroundColor: colors.BLUE,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 5,
    width: 'auto',
  },
  date: {
    bottom: -15,
    right: 5,
    width: 'auto',
    padding: 3,
    paddingHorizontal: 7,
    backgroundColor: colors.SECOND,
    borderRadius: 3,
  },
  delete: {
    width: '100%',
    height: 90,
    backgroundColor: colors.SECOND,
    borderRadius: 10,
    top: '50%',
    left: '50%',
    transform: [{ translateX: '-50%' }, { translateY: '-50%' }],
  },
});

export default PostCommentCard;

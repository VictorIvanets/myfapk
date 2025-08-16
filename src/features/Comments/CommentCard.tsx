import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import Button from 'src/components/Button';
import Flex from 'src/components/Flex';
import ScaleInPressable from 'src/components/ScaleInPressable';
import Text from 'src/components/Text';
import normalizeMongoDate from 'src/helpers/normalizeMongoDate';
import useDeleteComment from 'src/hooks/useDeleteComment';
import { colors } from 'src/theme/colors';
import type { CommentResponseT } from 'src/types/comments.types';

interface CardProps {
  item: CommentResponseT;
  currentUserId: string;
}
const CommentCard = ({ item, currentUserId }: CardProps) => {
  const [deleteItem, setDeleteItem] = useState(false);
  const { deleteComment } = useDeleteComment(item.setId);
  const delComment = () => {
    if (item.useId === currentUserId) {
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
          <Text size="caption">{normalizeMongoDate(item.createdAt)}</Text>
        </Flex>
        <Flex abs style={styles.login}>
          <Text>{item.login}</Text>
        </Flex>
      </Flex>
      {deleteItem && (
        <Flex center gap="s4" abs style={styles.delete}>
          <Text>Ви дійсно хочете видалити коментар?</Text>
          <Flex center gap="s10" row>
            <Button
              onPress={() => deleteComment(item._id)}
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
    marginBottom: 20,
    marginTop: 10,
    borderRadius: 15,
    width: 'auto',
  },
  date: {
    bottom: -10,
    right: 5,
    width: 'auto',
    padding: 3,
    paddingHorizontal: 7,
    backgroundColor: colors.SECOND,
    borderRadius: 10,
  },
  login: {
    top: -10,
    left: 10,
    width: 'auto',
    padding: 1,
    paddingHorizontal: 7,
    backgroundColor: colors.SECOND,
    borderRadius: 10,
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

export default CommentCard;

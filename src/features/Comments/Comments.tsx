import { FlashList } from '@shopify/flash-list';
import { ActivityIndicator, RefreshControl, StyleSheet } from 'react-native';
import Divider from 'src/components/Divider';
import Flex from 'src/components/Flex';
import { colors } from 'src/theme/colors';
import type { CommentResponseT } from 'src/types/comments.types';
import type { OneFishingT } from 'src/types/fishing';
import CommentCard from './CommentCard';
import type { UserInfoT } from 'src/types/auth.types';

interface CommentsProps {
  data: OneFishingT;
  comments: CommentResponseT[];
  isLoading: boolean;
  currentUser: UserInfoT;
  refetch: () => void;
}

const Comments = ({
  comments,
  isLoading,
  currentUser,
  refetch,
}: CommentsProps) => {
  return (
    <Flex flex style={styles.container}>
      {isLoading && <ActivityIndicator size={100} color={colors.ACCENT} />}
      {comments && (
        <FlashList
          inverted
          estimatedItemSize={33}
          ItemSeparatorComponent={Divider}
          data={comments}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={refetch} />
          }
          renderItem={({ item }) => (
            <CommentCard item={item} currentUserId={currentUser._id} />
          )}
        />
      )}
    </Flex>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 25,
  },
});

export default Comments;

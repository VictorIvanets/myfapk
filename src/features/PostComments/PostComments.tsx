import { FlashList } from '@shopify/flash-list';
import { ActivityIndicator, RefreshControl, StyleSheet } from 'react-native';
import Divider from 'src/components/Divider';
import Flex from 'src/components/Flex';
import { colors } from 'src/theme/colors';
import PostCommentCard from './PostCommentCard';
import useGetPostComments from 'src/hooks/comment_post/useGetPostComments';

interface CommentsProps {
  postId: string;
}

const PostComments = ({ postId }: CommentsProps) => {
  const { comments, isLoading, refetch } = useGetPostComments(postId);

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
            <PostCommentCard postId={postId} item={item} />
          )}
        />
      )}
    </Flex>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: '100%',
  },
});

export default PostComments;

import React from 'react';
import { StyleSheet } from 'react-native';
import type { TabCommentProps } from './types';
import Flex from 'src/components/Flex';
import Comments from 'src/features/Comments/Comments';
import useGetUserInfo from 'src/hooks/user/useGetUserInfo';
import AddComment from 'src/features/Comments/AddComment';

const CommentsTab = ({
  data,
  comments,
  isLoading,
  refetch,
}: TabCommentProps) => {
  const { userInfo: currentUser } = useGetUserInfo();
  return (
    <Flex spread style={styles.container}>
      <Flex style={styles.commentbox}>
        {data && currentUser && (
          <Comments
            refetch={refetch}
            data={data}
            comments={comments}
            isLoading={isLoading}
            currentUser={currentUser}
          />
        )}
      </Flex>
      <Flex style={styles.addcommentbox}>
        {data && currentUser && (
          <AddComment data={data} currentUser={currentUser} />
        )}
      </Flex>
    </Flex>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commentbox: {
    flex: 1,
  },
  addcommentbox: {
    height: 100,
    width: '100%',
  },
});

export default CommentsTab;

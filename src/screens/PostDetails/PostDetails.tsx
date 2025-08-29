import type { StackScreenProps } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FadeInView from 'src/components/FadeInView';
import Flex from 'src/components/Flex';
import Text from 'src/components/Text';
import { useAppNavigation } from 'src/hooks/useAppNavigation';
import type { RootStackParamListT } from 'src/Navigatior/route';
import { colors } from 'src/theme/colors';
import ScaleInPressable from 'src/components/ScaleInPressable';
import useGetOnePost from 'src/hooks/posts/useGetOnePost';
import colorSchemaCard, {
  ColorsKey,
} from 'src/features/PostCard/colorSchemaCard';
import normalizeMongoDate from 'src/helpers/normalizeMongoDate';
import AddPostComment from 'src/features/PostComments/AddPostComment';
import PostComments from 'src/features/PostComments/PostComments';

type Props = StackScreenProps<RootStackParamListT, 'PostDetails'>;

const PostDetails = ({ route }: Props) => {
  const data = route.params;
  const navigation = useAppNavigation();
  const { data: post } = useGetOnePost(data.id);
  const { background, text } = colorSchemaCard(
    post?.colorSchema || ColorsKey.WHITE,
  );

  return (
    <FadeInView style={styles.container}>
      <Flex spread centerH style={styles.containerrow} row>
        <Flex flex>
          <Text size="subtitler">Автор: {post?.userLogin}</Text>
        </Flex>
        <Flex flex>
          <Text size="subtitler">
            Дата: {normalizeMongoDate(post?.createdAt || '')}
          </Text>
        </Flex>
        <ScaleInPressable
          onPress={() => navigation.goBack()}
          onLongPress={() => navigation.navigate('HomeTabs')}
          style={styles.back}
        >
          <Ionicons name="chevron-back" size={45} color={colors.ACCENT} />
        </ScaleInPressable>
      </Flex>
      <Flex bg={background} center style={styles.content}>
        <Text color={text} center size="Bh3">
          {post?.description}
        </Text>
      </Flex>
      {post && (
        <Flex flex center>
          <PostComments postId={post?._id} />
          <AddPostComment postId={post?._id} />
        </Flex>
      )}
    </FadeInView>
  );
};

const styles = StyleSheet.create({
  content: {
    width: '100%',
    minHeight: 100,
    paddingHorizontal: 20,
    paddingVertical: 40,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    backgroundColor: colors.MAIN,
  },
  containerrow: {
    width: '100%',
    height: 80,
    paddingHorizontal: 14,
  },

  back: {
    height: '100%',
    transform: [{ translateX: 0 }, { translateY: 20 }],
  },
});

export default PostDetails;

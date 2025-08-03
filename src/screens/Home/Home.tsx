import { StyleSheet } from 'react-native';
import Flex from 'src/components/Flex';
import Text from 'src/components/Text';
import useGetUserInfoInStorage from 'src/hooks/useGetUserInfoInStorage';
import { colors } from 'src/theme/colors';

const Home = () => {
  const user = useGetUserInfoInStorage();

  return (
    <Flex style={styles.container}>
      <Text>USER: {user?.login}</Text>
      <Text>USER ID: {user?._id}</Text>
    </Flex>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.MAIN,
  },
});

export default Home;

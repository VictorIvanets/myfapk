import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Flex from 'src/components/Flex';
import Header from 'src/features/Header/Header';
import ScaleInPressable from 'src/components/ScaleInPressable';
import Text from 'src/components/Text';
import useGetUserInfo from 'src/hooks/user/useGetUserInfo';
import { colors } from 'src/theme/colors';

const Advertising = () => {
  const { userInfo } = useGetUserInfo();

  return (
    <Flex flex gap="s3" style={styles.container}>
      <Header userInfo={userInfo} />

      <Flex flex gap="s1" style={styles.list}>
        <ScrollView>
          <Text color="TEXTDARK">Advertising</Text>
          <ScaleInPressable>
            <Image
              source={require('../../../assets/images/Flagman.jpg')}
              style={styles.imagebord}
            />
          </ScaleInPressable>
          <ScaleInPressable>
            <Image
              source={require('../../../assets/images/fanatik.png')}
              style={styles.imagebord}
            />
          </ScaleInPressable>
          <ScaleInPressable>
            <Image
              source={require('../../../assets/images/shop.jpg')}
              style={styles.imagebord}
            />
          </ScaleInPressable>
          <ScaleInPressable>
            <Image
              source={require('../../../assets/images/Flagman.jpg')}
              style={styles.imagebord}
            />
          </ScaleInPressable>
        </ScrollView>
      </Flex>
    </Flex>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    backgroundColor: colors.MAIN,
    padding: 12,
  },
  imagebord: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
    marginBottom: 10,
  },
});

export default Advertising;

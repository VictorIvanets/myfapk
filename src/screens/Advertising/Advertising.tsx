import MaterialIcons from '@react-native-vector-icons/material-icons';
import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Flex from 'src/components/Flex';
import ScaleInPressable from 'src/components/ScaleInPressable';
import Text from 'src/components/Text';
import { useAppNavigation } from 'src/hooks/useAppNavigation';
import useGetUserInfo from 'src/hooks/useGetUserInfo';
import { colors } from 'src/theme/colors';

const Advertising = () => {
  const { userInfo } = useGetUserInfo();
  const { navigate } = useAppNavigation();

  return (
    <Flex flex gap="s3" style={styles.container}>
      <Flex style={styles.header} centerH row spread>
        <Image
          source={require('../../../assets/images/logoMf-01.png')}
          style={styles.image}
        />
        <ScaleInPressable onPress={() => navigate('Setting')}>
          <Flex centerH row gap="s1">
            <Flex right gap="s1">
              <Text size="subtitlemin"> {userInfo?.name}</Text>
              <Text size="subtitlemin"> {userInfo?.city}</Text>
              <Text size="subtitlemin"> {userInfo?.country}</Text>
            </Flex>
            <MaterialIcons
              name="account-circle"
              size={50}
              color={colors.ACCENT}
            />
          </Flex>
        </ScaleInPressable>
      </Flex>

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
  image: {
    width: 160,
    height: 60,
    resizeMode: 'contain',
  },
  imagebord: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  header: {
    borderBottomColor: colors.SECOND,
    borderBottomWidth: 3,
    paddingBottom: 10,
    borderRadius: 15,
  },
});

export default Advertising;

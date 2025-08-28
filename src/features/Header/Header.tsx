import React from 'react';
import { StyleSheet, Image } from 'react-native';
import type { UserInfoT } from 'src/types/auth.types';
import Flex from '../../components/Flex';
import ScaleInPressable from '../../components/ScaleInPressable';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import Text from '../../components/Text';
import { useAppNavigation } from 'src/hooks/useAppNavigation';
import { colors } from 'src/theme/colors';

type Props = {
  userInfo: UserInfoT | undefined;
};

const Header = ({ userInfo }: Props) => {
  const { navigate } = useAppNavigation();

  return (
    <Flex style={styles.header} centerH row spread>
      <ScaleInPressable onPress={() => navigate('Rules')}>
        <Image
          source={require('../../../assets/images/logoMf-01.png')}
          style={styles.image}
        />
      </ScaleInPressable>

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
  );
};

const styles = StyleSheet.create({
  image: {
    width: 160,
    height: 60,
    resizeMode: 'contain',
  },
  header: {
    borderBottomColor: colors.SECOND,
    borderBottomWidth: 3,
    paddingBottom: 10,
    borderRadius: 15,
  },
});

export default Header;

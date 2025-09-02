import { Image, StyleSheet } from 'react-native';
import type { ToastShowParams } from 'react-native-toast-message';
import Flex from 'src/components/Flex';
import Text from 'src/components/Text';
import { colors } from 'src/theme/colors';

const toastConfig = {
  errorToast: ({ text1, text2 }: ToastShowParams) => (
    <Flex gap="s2" row style={styles.container}>
      <Flex style={styles.redline} />
      <Flex flex center>
        <Image
          source={require('../../assets/images/logoMf-01.png')}
          style={styles.image}
        />
      </Flex>
      <Flex flex centerV>
        <Text size="Bsubtitle">{text1}</Text>
        <Text size="Bsubtitle">{text2}</Text>
      </Flex>
    </Flex>
  ),
  succssesToast: ({ text1, text2 }: ToastShowParams) => (
    <Flex gap="s2" row style={styles.container}>
      <Flex style={styles.greenline} />
      <Flex flex center>
        <Image
          source={require('../../assets/images/logoMf-01.png')}
          style={styles.image}
        />
      </Flex>
      <Flex flex centerV>
        <Text size="Bsubtitle">{text1}</Text>
        <Text size="Bsubtitle">{text2}</Text>
      </Flex>
    </Flex>
  ),
};

export default toastConfig;

const styles = StyleSheet.create({
  redline: {
    height: '100%',
    width: 25,
    backgroundColor: colors.RED,
  },
  greenline: {
    height: '100%',
    width: 25,
    backgroundColor: colors.ACCENT,
  },
  container: {
    height: 80,
    width: '100%',
    backgroundColor: colors.MAIN,
    borderColor: colors.TEXT,
    borderWidth: 0.5,
    borderRadius: 5,
    overflow: 'hidden',
  },
  image: {
    width: 60,
    height: 40,
    resizeMode: 'contain',
  },
});

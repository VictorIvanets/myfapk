import React from 'react';
import { StyleSheet } from 'react-native';
import FadeInView from 'src/components/FadeInView';
import Flex from 'src/components/Flex';
import Text from 'src/components/Text';

const Rules = () => {
  return (
    <Flex style={styles.container}>
      <FadeInView>
        <Flex flex center>
          <Text size="Bh4" color="ACCENT">
            ПРАВИЛА КОРИСТУВАННЯ
          </Text>

          <Text center>
            Зареєструйтеся. (Важливий лише логін та пароль, усе інше у довільній
            формі)
          </Text>
          <Text center>Увійдіть.</Text>
          <Text center>
            Далі Ви можете скористуватися картою, та позначити місце рибалки.
          </Text>
          <Text center>
            Коли на карті з'явиться зелена мітка, натисніть на неї.
          </Text>
          <Text center>
            У вікні, що з'явилося, заповніть дату, назву та опис рибалки.
          </Text>
          <Text center>Також Ви можете оцінити її.</Text>
          <Text center>Натисніть "Додати".</Text>

          <Text center>Перелік рибалок:</Text>

          <Text center>Праворуч будуть додаватися усі Ваші рибалки.</Text>
          <Text center>
            Ви можете переглянути місце рибалки на карті, або видалити запис.
          </Text>
          <Text center>
            Натиснувши на блок, Ви переходите до повної інформації, та можете
            додати фото, натиснувши на "Завантажити фото".
          </Text>
          <Text center> Натисніть "Вибрати фото", та "Завантажити"</Text>
          <Text center>Усі записи:</Text>
          <Text center>
            Для того, щоб пидивитися усі мітки, натисніть "Показати усі місця".
          </Text>
          <Text center>
            Натиснувши на мітку, можна перейти до детальної інформації про це
            місце.
          </Text>

          <Text center>Уся інформація у загальному користуванні!</Text>
          <Text center>Усі користувачі можуть бачити усі місця!</Text>
        </Flex>
      </FadeInView>
    </Flex>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
});

export default Rules;

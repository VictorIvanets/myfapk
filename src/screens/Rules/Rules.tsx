import React from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import FadeInView from 'src/components/FadeInView';
import Flex from 'src/components/Flex';
import Text from 'src/components/Text';
import { colors } from 'src/theme/colors';

const Rules = () => {
  return (
    <Flex style={styles.container}>
      <FadeInView>
        <ScrollView>
          <Flex flex gap="s3">
            <Text center size="Bh4" color="ACCENT">
              ПРАВИЛА КОРИСТУВАННЯ
            </Text>
            <Flex>
              <Text size="Bheadline" color="ACCENT">
                Логін
              </Text>
              <Text size="subtitlemin">
                Щоб користуватися додатком зареєструйтеся або увійдіть.
              </Text>
              <Text color="TEXTDARK" size="subtitlemin">
                (Важливий лише логін та пароль, усе інше у довільній формі)
              </Text>
              <Text size="subtitlemin">
                Щоб вийти, натисніть на інформацію про юзера на сторінці
                "Рибалки"
              </Text>
            </Flex>
            <Flex>
              <Text size="Bheadline" color="ACCENT">
                Сторінка "Рибалки"
              </Text>
              <Text size="subtitlemin">
                Тут ви можете продивитися свої записи, та записи інших
                користувачів.
              </Text>
              <Text size="subtitlemin">
                Нитиснувши на запис, Ви перейдете до детальної інформайії.
              </Text>
              <Text color="RED" size="subtitlemin">
                Нитиснувши довго на запис, Ви можете видалити його, якщо Ви його
                створили.
              </Text>
            </Flex>

            <Flex>
              <Text size="Bheadline" color="ACCENT">
                Сторінка "Карта"
              </Text>
              <Text size="subtitlemin">
                Тут ви можете зробити запис.{'\n'}* Натисніть на місце, де ви
                ловите або ловили, з'явиться синя мітка, натисніть на неї, або
                на червону мітку (вона показує Ваше місце положення на даний
                момент).{'\n'}* Ви потрапите на сторінку створення запису.
                {'\n'}* Дайте назву запису (Просто назва, або місце), оцініть
                його, напишіть що ловили та на що (любу корисну інформацію).
                {'\n'}* Додайте дату.{'\n'}* Натисніть на "Створити".{'\n'}* Ви
                перейдете до детальної інформації про це місце.
              </Text>
              <Text size="Bheadline" color="ACCENT">
                Пошук по карті
              </Text>
              <Text size="subtitlemin">
                Натисніть "Всі мітки".
                {'\n'}* Ви побачити всі місця котрі додали всі користувачі.
                {'\n'}* Збільшіть, якщо на мітці стоїть число.
                {'\n'}* Натиснувши на мітку, Ви перейдете до детальної
                інформації про нього.
                {'\n'}* Також можна відфільтрувати по рибі, котра вас цікавить.
              </Text>
            </Flex>

            <Flex>
              <Text size="Bheadline" color="ACCENT">
                Детальна інформація про місце
              </Text>
              <Text size="subtitlemin">
                Тут ви можете подивитися всю інформацію про запис.
                {'\n'}* Ви можете подивитися або додати фото.
                {'\n'}* Нитиснувши довго на фото, Ви можете видалити його.
                {'\n'}* Ви можете залишити коментарі.{'\n'}
                <Text color="RED" size="subtitlemin">
                  Додавати та видаляти фото може тільки той, хто створив запис.
                </Text>
              </Text>
            </Flex>

            <Flex>
              <Text center>Уся інформація у загальному користуванні!</Text>
              <Text center>Усі користувачі можуть бачити усі місця!</Text>
            </Flex>
          </Flex>
        </ScrollView>
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
    backgroundColor: colors.MAIN,
  },
});

export default Rules;

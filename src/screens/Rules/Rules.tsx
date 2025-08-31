import React from 'react';
import { Linking, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import FadeInView from 'src/components/FadeInView';
import Flex from 'src/components/Flex';
import Text from 'src/components/Text';
import { colors } from 'src/theme/colors';

const Rules = () => {
  return (
    <Flex style={styles.container}>
      <FadeInView>
        <Flex height={60}>
          <Text center size="Bh4" color="ACCENT">
            ПРАВИЛА КОРИСТУВАННЯ
          </Text>
          <Text center size="subtitler">
            MyFishig. Version 3.03 beta
          </Text>
        </Flex>

        <ScrollView>
          <Flex flex gap="s4">
            <Flex>
              <Text size="Bsubtitle" color="ACCENT">
                ☛ Логін
              </Text>
              <Text style={styles.text} size="subtitlemin">
                ▸ Щоб користуватися додатком зареєструйтеся або увійдіть.
                {'\n'}▸ Щоб вийти, натисніть на інформацію про юзера на сторінці
                "Рибалки"
              </Text>
            </Flex>
            <Flex>
              <Text size="Bsubtitle" color="ACCENT">
                ☛ Сторінка "Рибалки"
              </Text>
              <Text style={styles.text} size="subtitlemin">
                ▸ Тут ви можете продивитися свої записи, та записи інших
                користувачів. {'\n'}▸ Нитиснувши на запис, Ви перейдете до
                детальної інформайії.
              </Text>
            </Flex>
            <Flex>
              <Text size="Bsubtitle" color="ACCENT">
                ☛ Сторінка "Платники"
              </Text>
              <Text style={styles.text} size="subtitlemin">
                ▸ Тут ви можете знайти водойми з платною рибалкию. {'\n'}▸
                Нитиснувши на запис, Ви перейдете до детальної інформайії, де є
                інформація про став, контактні телефони.
              </Text>
            </Flex>
            <Flex>
              <Text size="Bsubtitle" color="ACCENT">
                ☛ Сторінка "Спільнота"
              </Text>
              <Text style={styles.text} size="subtitlemin">
                ▸ Тут знаходяться оголошення, питання, пропозиції. {'\n'}▸
                Нитиснувши на запис, Ви перейдете до детальної інформайії, де є
                коментарі та відповіді. {'\n'}▸ Ви можете додати свої записи.
                Натисніть на іконку, введіть текст, виберіть колір.
              </Text>
            </Flex>

            <Flex>
              <Text size="Bsubtitle" color="ACCENT">
                ☛ Сторінка "Карта"
              </Text>
              <Text style={styles.text} size="subtitlemin">
                ▸ Тут ви можете зробити запис.{'\n'}▸ Натисніть на місце, де ви
                ловите або ловили, з'явиться синя мітка, натисніть на неї, або
                на червону мітку (вона показує Ваше місце положення на даний
                момент).{'\n'}▸ Ви потрапите на сторінку створення запису.
                {'\n'}▸ Дайте назву запису (Просто назва, або місце), оцініть
                його, напишіть що ловили та на що (любу корисну інформацію).
                {'\n'}▸ Додайте дату.{'\n'}* Натисніть на "Створити".{'\n'}▸ Ви
                перейдете до детальної інформації про це місце.
              </Text>
            </Flex>
            <Flex>
              <Text size="Bsubtitle" color="ACCENT">
                ☛ Пошук по карті
              </Text>
              <Text style={styles.text} size="subtitlemin">
                ▸ Натисніть "Всі мітки".
                {'\n'}▸ Ви побачити всі місця котрі додали всі користувачі.
                {'\n'}▸ Збільшіть, якщо на мітці стоїть число.
                {'\n'}▸ Натиснувши на мітку, Ви перейдете до детальної
                інформації про нього.
                {'\n'}▸ Також можна відфільтрувати по рибі, котра вас цікавить.
              </Text>
            </Flex>

            <Flex>
              <Text size="Bsubtitle" color="ACCENT">
                ☛ Детальна інформація про місце
              </Text>
              <Text style={styles.text} size="subtitlemin">
                ▸ Тут ви можете подивитися всю інформацію про запис.
                {'\n'}▸ Ви можете подивитися або додати фото.
                {'\n'}▸ Нитиснувши довго на фото, Ви можете видалити його.
                {'\n'}▸ Ви можете залишити коментарі.{'\n'}
              </Text>
              <Text center color="RED" size="subtitlemin">
                Додавати та видаляти фото, записи, коментарі може тільки той,
                хто їх створив.{'\n'}
                Для видалення натисніть, та тримайте секудну, поки не з'явиться
                підтвердження видалення.
              </Text>
            </Flex>

            <Flex>
              <Text center>Уся інформація у загальному користуванні!</Text>
              <Text center>Усі користувачі можуть бачити усі місця!</Text>
            </Flex>
          </Flex>
          <Flex gap="s1">
            <Text size="Bsubtitle" color="ACCENT">
              ☛ Інформація для партнерів
            </Text>
            <Flex gap="s2">
              <Text
                color="ACCENT"
                size="subtitlemin"
                onPress={() => Linking.openURL('mailto:imperia.zt@gmail.com')}
              >
                📧 Якщо Вас зацікавила співпраця, пишіть на пошту
              </Text>
              <Text
                color="ACCENT"
                size="subtitlemin"
                onPress={() =>
                  Linking.openURL('https://victorivanets.github.io/myfapp')
                }
              >
                🌐 Web-версія додатку
              </Text>
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
  text: {
    lineHeight: 18,
  },
});

export default Rules;

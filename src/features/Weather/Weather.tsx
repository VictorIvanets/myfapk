import type { WeatherT } from 'src/types/weather.types';
import { useEffect, useState } from 'react';
import { getWeatherApi } from 'src/services/getWeather';
import Flex from '../../components/Flex';
import type { SortCoordsT } from 'src/types/map.types';
import Text from '../../components/Text';

interface WeatherProps {
  data?: WeatherT;
  coords?: SortCoordsT;
  warn?: boolean;
}
const Weather = ({ data, coords, warn = false }: WeatherProps) => {
  const [getData, setGetData] = useState<WeatherT>();

  const getWeather = async (coord: SortCoordsT) => {
    const res = await getWeatherApi(coord);
    setGetData(res);
  };

  useEffect(() => {
    if (data) setGetData(data);
    if (coords) getWeather(coords);
  }, [data, coords]);

  let wind;
  if (getData) {
    const wd = getData.deg;

    if ((wd >= 0 && wd <= 45) || (wd >= 320 && wd <= 360)) {
      wind = 'Північний';
    }
    if (wd >= 46 && wd <= 130) {
      wind = 'Східний';
    }
    if (wd >= 131 && wd <= 230) {
      wind = 'Південний';
    }
    if (wd >= 231 && wd <= 319) {
      wind = 'Західний';
    }
  }

  const firstletterUpper = (str: string | undefined) => {
    if (!str) return '';
    return str[0].toUpperCase() + str.slice(1);
  };

  return (
    <Flex
      // eslint-disable-next-line react-native/no-inline-styles
      style={{ paddingVertical: 10, marginVertical: 10 }}
      gap="s1"
      bg="SECOND20"
    >
      {!warn ? (
        <Text color="ACCENT" size="Bsubtitle">
          Погода на момент створення запису
        </Text>
      ) : (
        <Text color="ACCENT" size="Bsubtitle">
          Погода зараз
        </Text>
      )}
      <Text size="subtitler">{firstletterUpper(getData?.sky)} </Text>
      <Text size="subtitler">Tемпература: {getData?.temp} °C</Text>
      <Text size="subtitler">Вологість: {getData?.humidity} %</Text>
      <Text size="subtitler">Тиск: {getData?.grnd_level} hPa</Text>
      <Text size="subtitler">
        Вітер: {wind} {getData?.speed} м/с
      </Text>
      {!warn && (
        <Text color="TEXTDARK" size="subtitlemin">
          ⚠ данні атоматично встановлюються під час створення запису, {'\n'}
          за координатами вибраними на мапі
        </Text>
      )}
    </Flex>
  );
};

export default Weather;

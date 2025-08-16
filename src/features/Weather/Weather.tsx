import type { WeatherT } from 'src/types/weather.types';
import { useEffect, useState } from 'react';
import { getWeatherApi } from 'src/services/getWeather';
import Flex from '../../components/Flex';
import type { SortCoordsT } from 'src/types/map.types';
import Text from '../../components/Text';

interface WeatherProps {
  data?: WeatherT;
  coords?: SortCoordsT;
}
const Weather = ({ data, coords }: WeatherProps) => {
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

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <Flex style={{ paddingVertical: 10, marginVertical: 10 }} bg="SECOND20">
      <Text color="ACCENT" size="Bsubtitle">
        Погода на момент створення запису
      </Text>
      <Text size="subtitle">{getData?.sky.toUpperCase()} </Text>
      <Text size="subtitle">Tемпература: {getData?.temp} °C</Text>
      <Text size="subtitle">Вологість: {getData?.humidity} %</Text>
      <Text size="subtitle">Тиск: {getData?.grnd_level} hPa</Text>
      <Text size="subtitle">
        Вітер: {wind} {getData?.speed} м/с
      </Text>
      <Text color="TEXTDARK" size="subtitlemin">
        ⚠ данні атоматично встановлюються під час створення запису, {'\n'}
        за координатами вибраними на мапі
      </Text>
    </Flex>
  );
};

export default Weather;

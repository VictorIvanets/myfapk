import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import Button from 'src/components/Button';
import Flex from 'src/components/Flex';
import useGetUserInfoInStorage from 'src/hooks/useGetUserInfoInStorage';
import { colors } from 'src/theme/colors';
import type { LeafletViewCoordsT } from 'src/types/map.types';

interface FilterProps {
  allFishins: LeafletViewCoordsT[];
  setFilterAll: React.Dispatch<React.SetStateAction<LeafletViewCoordsT[]>>;
}

const FishFilter = ({ allFishins, setFilterAll }: FilterProps) => {
  const userId = useGetUserInfoInStorage();

  const [value, setValue] = useState<string>();

  useEffect(() => {
    if (value === 'my' && userId) {
      const result = allFishins.filter(i => i.userId === userId._id);
      setFilterAll(result);
    } else if (value === 'paid') {
      const result = allFishins.filter(i => i.paid !== undefined);
      setFilterAll(result);
    } else if (value === 'rating7') {
      const result = allFishins.filter(i => i.score && i.score >= 7);
      setFilterAll(result);
    } else if (value) {
      const result = allFishins.filter(i =>
        i.description?.toLocaleLowerCase().includes(value.toLocaleLowerCase()),
      );
      setFilterAll(result);
    } else {
      setFilterAll(allFishins);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <Flex style={styles.container}>
      <Button
        onPress={() => setValue(undefined)}
        view="small"
        title="Всі місця"
      />
      <Button onPress={() => setValue('my')} view="small" title="Мої" />
      <Button onPress={() => setValue('paid')} view="small" title="Платні" />
      <Button
        onPress={() => setValue('короп')}
        outline
        view="small"
        title="Короп"
      />
      <Button
        onPress={() => setValue('Карась')}
        outline
        view="small"
        title="Карась"
      />
      <Button
        onPress={() => setValue('лоб')}
        outline
        view="small"
        title="Товстолоб"
      />
      <Button
        onPress={() => setValue('амур')}
        outline
        view="small"
        title="Aмур"
      />
      <Button
        onPress={() => setValue('лин')}
        outline
        view="small"
        title="Линок"
      />
      <Button
        onPress={() => setValue('Лящ')}
        outline
        view="small"
        title="Лящ"
      />
      <Button
        onPress={() => setValue('Щук')}
        outline
        view="small"
        title="Щука"
      />
      <Button
        onPress={() => setValue('Судак')}
        outline
        view="small"
        title="Судак"
      />
      <Button
        onPress={() => setValue('Сом')}
        outline
        view="small"
        title="Сом"
      />

      <Button
        onPress={() => setValue('rating7')}
        view="small"
        title="Оцінка > 7"
      />
    </Flex>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.MAIN50,
    borderRadius: 10,
  },
});

export default FishFilter;

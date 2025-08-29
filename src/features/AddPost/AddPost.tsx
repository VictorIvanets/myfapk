import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import Flex from 'src/components/Flex';
import Text from 'src/components/Text';
import ColorCard from './ColorCard';
import { ColorsKey, schemaColorCrard } from '../PostCard/colorSchemaCard';
import Button from 'src/components/Button';
import InputField from 'src/components/InputField/InputField';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { PostSchemaDataFields } from './postSchema';
import { postSchema } from './postSchema';
import { ScrollView } from 'react-native-gesture-handler';
import useCreatePost from 'src/hooks/posts/useCreatePost';

type Props = {
  onClose: (value: boolean) => void;
};

const AddPost = ({ onClose }: Props) => {
  const [colorValue, setColorValue] = useState<ColorsKey>(ColorsKey.TEXTGRAY);

  const { create } = useCreatePost();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PostSchemaDataFields>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      post: '',
    },
  });

  const submit = (data: { post: string }) => {
    create({ description: data.post, colorSchema: colorValue });
    reset();
    onClose(false);
  };

  return (
    <Flex spread centerH style={styles.container}>
      <ScrollView style={styles.wrapper}>
        <Flex center>
          <Text color="ACCENT" size="Bh3">
            Додайте запис
          </Text>
          <Text>(Питання, оголошення, тощо)</Text>
        </Flex>
        <Controller
          control={control}
          name="post"
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <InputField
              multiline
              heightArea={120}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              error={errors.post ? errors.post?.message : error?.message}
              ibackground
            />
          )}
        />

        <Flex center gap="s6">
          <Flex center>
            <Text>Оберіть колір</Text>
            <Flex style={styles.bgBoxWrawpper} row wrap center gap="s4">
              {schemaColorCrard.map(i => (
                <ColorCard
                  colorValue={colorValue}
                  setColorValue={setColorValue}
                  key={i.name}
                  name={i.name}
                  background={i.background}
                  text={i.text}
                />
              ))}
            </Flex>
          </Flex>
          <Button onPress={handleSubmit(submit)} view="big" title="Додати" />
        </Flex>
      </ScrollView>
    </Flex>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
    paddingTop: 100,
  },
  container: {
    position: 'absolute',
    inset: 10,

    paddingHorizontal: 30,
    backgroundColor: '#101010e6',
  },
  bgBoxWrawpper: {
    padding: 10,
    paddingHorizontal: 0,
  },
});

export default AddPost;

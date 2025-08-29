import React from 'react';
import { StyleSheet } from 'react-native';
import type { CommentSchemaDataFields } from './commentSchema';
import { commentSchema } from './commentSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import InputField from 'src/components/InputField/InputField';
import Flex from 'src/components/Flex';
import { colors } from 'src/theme/colors';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import ScaleInPressable from 'src/components/ScaleInPressable';
import useCreatePostComment from 'src/hooks/comment_post/useCreatePostComment';

interface AddCommentProps {
  postId: string;
}

const AddPostComment = ({ postId }: AddCommentProps) => {
  const { create } = useCreatePostComment();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentSchemaDataFields>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      comment: '',
    },
  });

  const submit = (comm: { comment: string }) => {
    create({ comment: comm.comment, postId });
    reset();
  };

  return (
    <Flex row gap="s2" style={styles.container}>
      <Flex flex>
        <Controller
          control={control}
          name="comment"
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <InputField
              multiline
              heightArea={80}
              label="Додати коментар"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              error={errors.comment ? errors.comment?.message : error?.message}
              ibackground
              borderColor={colors.SECOND}
            />
          )}
        />
      </Flex>
      <ScaleInPressable onPress={handleSubmit(submit)} style={styles.send}>
        <MaterialDesignIcons
          name="send-circle"
          size={60}
          color={colors.ACCENT}
        />
      </ScaleInPressable>
    </Flex>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  send: {
    height: '100%',
    transform: [{ translateX: 0 }, { translateY: 35 }],
  },
});

export default AddPostComment;

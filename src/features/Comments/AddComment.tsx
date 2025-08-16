import React from 'react';
import { StyleSheet } from 'react-native';
import type { CommentSchemaDataFields } from './commentSchema';
import { commentSchema } from './commentSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import InputField from 'src/components/InputField/InputField';
import type { OneFishingT } from 'src/types/fishing';
import type { UserInfoT } from 'src/types/auth.types';
import Flex from 'src/components/Flex';
import { colors } from 'src/theme/colors';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import useCreateComment from 'src/hooks/useCreateComment';
import type { CommentT } from 'src/types/comments.types';
import ScaleInPressable from 'src/components/ScaleInPressable';

interface AddCommentProps {
  data: OneFishingT;
  currentUser: UserInfoT;
}

const AddComment = ({ data, currentUser }: AddCommentProps) => {
  const { create } = useCreateComment(data._id);

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
    const payload: CommentT = {
      login: currentUser.name!,
      useId: currentUser._id!,
      setId: data._id,
      comment: comm.comment,
    };
    create(payload);
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  send: {
    height: '100%',
    transform: [{ translateX: 0 }, { translateY: 25 }],
  },
});

export default AddComment;

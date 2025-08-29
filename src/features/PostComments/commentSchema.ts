import { z } from 'zod';

export const commentSchema = z.object({
  comment: z
    .string({
      error: 'Напишіть коментар',
    })
    .min(1),
});

export type CommentSchemaDataFields = z.infer<typeof commentSchema>;

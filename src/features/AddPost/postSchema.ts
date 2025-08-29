import { z } from 'zod';

export const postSchema = z.object({
  post: z
    .string({
      error: 'Напишіть питання, чи оголошення',
    })
    .min(1)
    .max(64, 'Не більше 64 символів'),
});

export type PostSchemaDataFields = z.infer<typeof postSchema>;

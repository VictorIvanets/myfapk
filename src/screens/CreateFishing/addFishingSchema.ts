import { z } from 'zod';

export const addFishingSchema = z.object({
  title: z
    .string({
      error: 'Назва є обов’язковою',
    })
    .min(2, 'Назва є обов’язковим, не менше 3х символів'),
  description: z
    .string({
      error: 'Опис є обов’язковим',
    })
    .min(4, 'Опис є обов’язковим, не менше 10ти символів'),
  score: z
    .number({
      error: 'Оцінка є обов’язковою',
    })
    .min(1, 'Оцінка не може бути 0 мін. 1')
    .max(10, 'Оцінка не може бути більшою за 10'),
  date: z
    .string({
      error: 'Дата є обов’язковою',
    })
    .min(8, 'Дата є обов’язковою'),
  paidTitle: z.string(),
  paidPrise: z.number(),
  paidOwner: z.string(),
  paidContact: z.string(),
});

export type AddFishingSchemaDataFields = z.infer<typeof addFishingSchema>;

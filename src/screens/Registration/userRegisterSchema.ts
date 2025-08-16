import { z } from 'zod';

export const userRegisterSchema = z.object({
  login: z
    .string({
      error: 'login є обов’язковим',
    })
    .min(4, 'login є обов’язковим, не менше 4х символів')
    .max(16, 'Не більше 16 символів'),
  password: z
    .string({
      error: 'Пароль є обов’язковим',
    })
    .min(4, 'Пароль є обов’язковим, не менше 4х символів'),
  name: z
    .string({
      error: 'Ім’я є обов’язковим',
    })
    .min(2, 'Ім’я є обов’язковим, не менше 2х символів')
    .max(16, 'Не більше 16 символів'),
  subname: z
    .string({
      error: 'Прізвище є обов’язковим',
    })
    .min(2, 'Прізвище є обов’язковим, не менше 2х символів')
    .max(16, 'Не більше 16 символів'),
  country: z
    .string({
      error: 'Країна є обов’язковим полем',
    })
    .min(2, 'Країна є обов’язковим, не менше 2х символів')
    .max(16, 'Не більше 16 символів'),
  city: z
    .string({
      error: 'Місто є обов’язковим',
    })
    .min(2, 'Місто є обов’язковим, не менше 2х символів')
    .max(16, 'Не більше 16 символів'),
});

export type UserRegisterDataFields = z.infer<typeof userRegisterSchema>;

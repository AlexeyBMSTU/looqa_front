import { validateFormWithZod } from '@/utils/validateForm';
import { z } from 'zod';

export const registrationSchema = z.object({
  username: z
    .string()
    .min(1, 'Имя не должно быть пустым')
    .min(3, 'Имя должно содержать минимум 3 символа')
    .max(20, 'Имя должно содержать не более 20 символов')
    .regex(
      /^[a-zA-Z0-9_]+$/,
      'Имя может содержать только латинские буквы или цифры'
    ),
  password: z
    .string()
    .min(1, 'Пароль не должен быть пустым')
    .min(6, 'Минимум 6 символов')
    .regex(/[a-z]/, 'Хотя бы одну строчную букву')
    .regex(/[A-Z]/, 'Хотя бы одну заглавную букву')
    .regex(/\d/, 'Хотя бы одну цифру')
    .regex(/[^a-zA-Z\d]/, 'Хотя бы один специальный символ'),
  role: z.enum(['owner', 'qa'], {
    message: 'Роль должна быть выбрана',
  }),
});

export const usernameValidationRules = [
  {
    validator: validateFormWithZod(
      z.object({ username: registrationSchema.shape.username }),
      'username'
    ),
  },
];

export const passwordValidationRules = [
  {
    validator: validateFormWithZod(
      z.object({ password: registrationSchema.shape.password }),
      'password'
    ),
  },
];

export const roleValidationRules = [
  {
    validator: validateFormWithZod(
      z.object({ role: registrationSchema.shape.role }),
      'role'
    ),
  },
];

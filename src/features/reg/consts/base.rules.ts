import { Rule } from '@/shared/types';

export const passwordRules: Rule[] = [
  { type: 'min', value: 6, message: 'Минимум 6 символов' },
  { type: 'regex', pattern: /[a-z]/, message: 'Хотя бы одну строчную букву' },
  { type: 'regex', pattern: /[A-Z]/, message: 'Хотя бы одну заглавную букву' },
  { type: 'regex', pattern: /\d/, message: 'Хотя бы одну цифру' },
  {
    type: 'regex',
    pattern: /[^a-zA-Z\d]/,
    message: 'Хотя бы один специальный символ',
  },
] as const;

export const usernameRules: Rule[] = [
  { type: 'min', value: 3, message: 'Минимум 3 символа' },
  { type: 'max', value: 20, message: 'Максимум 20 символов' },
  {
    type: 'regex',
    pattern: /^[a-zA-Z0-9_]+$/,
    message: 'Имя может содержать только латинские буквы или цифры',
  },
] as const;

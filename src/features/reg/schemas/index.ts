import { Rule } from '@/shared/types';
import { createSchemaFromRules } from '@/shared/utils/createSchemaFromRules';
import { z } from 'zod';
import { passwordRules, usernameRules } from '../consts/base.rules';

export const registrationSchema = z.object({
  username: createSchemaFromRules('Имя', usernameRules),
  password: createSchemaFromRules('Пароль', passwordRules),
  role: z.enum(['owner', 'qa'], {
    message: 'Роль должна быть выбрана',
  }),
});

export const calculateStrengthFromRules = (
  value: string,
  rules: Rule[]
): number => {
  if (!value) return 0;

  const totalRules = rules.length;
  const passedRules = rules.filter(rule => {
    switch (rule.type) {
      case 'min':
        return value.length >= rule.value;
      case 'max':
        return value.length <= rule.value;
      case 'regex':
        return rule.pattern.test(value);
    }
  }).length;

  return Math.round((passedRules / totalRules) * 100);
};

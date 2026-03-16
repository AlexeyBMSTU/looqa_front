import { registrationSchema } from '@/features/reg/schemas';
import { validateFormWithZod } from '@/utils/validateForm';
import { z } from 'zod';
import { FIELDS } from '.';

export const usernameValidationRules = [
  {
    validator: validateFormWithZod(
      z.object({ username: registrationSchema.shape.username }),
      FIELDS.USERNAME
    ),
  },
];

export const passwordValidationRules = [
  {
    validator: validateFormWithZod(
      z.object({ password: registrationSchema.shape.password }),
      FIELDS.PASSWORD
    ),
  },
];

export const roleValidationRules = [
  {
    validator: validateFormWithZod(
      z.object({ role: registrationSchema.shape.role }),
      FIELDS.ROLE
    ),
  },
];

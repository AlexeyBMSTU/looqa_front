import { z } from 'zod';
import { ROLES } from './consts';
import { registrationSchema } from './helpers/validate.rules';

export type RoleType = (typeof ROLES)[keyof typeof ROLES];

export type RegistrationData = z.infer<typeof registrationSchema>;

export interface RequestAuthProps {
  username: string;
  password: string;
  role: RoleType;
}

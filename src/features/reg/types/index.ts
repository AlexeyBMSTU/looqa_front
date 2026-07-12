import { registrationSchema } from '@/features/reg/schemas';
import { z } from 'zod';
import { ROLES } from '../consts';

export type RoleType = (typeof ROLES)[keyof typeof ROLES];

export type RegistrationData = z.infer<typeof registrationSchema>;

export interface RequestAuthProps {
  username: string;
  password: string;
  role: RoleType;
}

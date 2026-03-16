import { passwordRules } from '../consts/base.rules';
import { calculateStrengthFromRules } from '../schemas';

export const calculatePasswordStrength = (password: string): number => {
  return calculateStrengthFromRules(password, passwordRules);
};

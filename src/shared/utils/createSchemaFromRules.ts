import { z } from 'zod';
import { Rule } from '../types';

export const createSchemaFromRules = (fieldName: string, rules: Rule[]) => {
  let schema = z.string().min(1, `${fieldName} не должно быть пустым`);

  for (const rule of rules) {
    switch (rule.type) {
      case 'min':
        schema = schema.min(rule.value, rule.message);
        break;
      case 'max':
        schema = schema.max(rule.value, rule.message);
        break;
      case 'regex':
        schema = schema.regex(rule.pattern, rule.message);
        break;
    }
  }

  return schema;
};

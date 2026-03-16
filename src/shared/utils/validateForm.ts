import { z } from 'zod';

export const validateFormWithZod = (
  schema: z.ZodSchema<any>,
  fieldName: string
) => {
  return async (_: any, value: any) => {
    try {
      const data = { [fieldName]: value };
      schema.parse(data);
      return Promise.resolve();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const firstError = error.issues[0];
        return Promise.reject(new Error(firstError.message));
      }
      return Promise.reject(new Error('Ошибка валидации'));
    }
  };
};

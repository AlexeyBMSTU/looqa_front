import { apiService } from '@/services/api/APIService';
import { action, makeAutoObservable } from 'mobx';
import { z } from 'zod';
import { registrationSchema } from './helpers/validate.rules';
import { RegistrationData, RequestAuthProps, RoleType } from './reg.types';

class RegStore {
  role: RoleType = 'owner';

  constructor() {
    makeAutoObservable(this);
  }

  @action.bound
  setRole(role: RoleType) {
    this.role = role;
  }

  @action.bound
  validateRegistrationData(data: unknown): RegistrationData {
    try {
      return registrationSchema.parse(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new Error('Ошибка валидации данных регистрации', {
          cause: error,
        });
      }
      throw error;
    }
  }

  @action.bound
  async requestAuth(body: RequestAuthProps) {
    try {
      const validatedData = this.validateRegistrationData(body);

      const requestParams = {
        url: '/auth/reg/',
        body: validatedData,
      };
      await apiService.post(requestParams);
    } catch (error) {
      throw new Error('RegStore::requestAuth', { cause: error });
    }
  }
}

export const regStore = new RegStore();

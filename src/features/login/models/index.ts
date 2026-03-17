import { apiService } from '@/core/api/APIService';
import { action, makeAutoObservable } from 'mobx';
import { RequestAuthProps } from '../types';

class LoginModel {
  constructor() {
    makeAutoObservable(this);
  }

  @action.bound
  async requestAuth(body: RequestAuthProps) {
    try {
      const requestParams = {
        url: '/auth/login/',
        body,
      };
      await apiService.post(requestParams);
    } catch (error) {
      throw new Error('LoginModel::requestAuth', { cause: error });
    }
  }
}

export const loginModel = new LoginModel();

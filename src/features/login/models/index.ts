import { action, makeAutoObservable } from 'mobx';
import { loginAdapter } from '../adapters';
import { RequestAuthProps } from '../types';

class LoginModel {
  constructor() {
    makeAutoObservable(this);
  }

  @action.bound
  async requestAuth(body: RequestAuthProps) {
    try {
      await loginAdapter(body);
    } catch (error) {
      throw new Error('LoginModel::requestAuth', { cause: error });
    }
  }
}

export const loginModel = new LoginModel();

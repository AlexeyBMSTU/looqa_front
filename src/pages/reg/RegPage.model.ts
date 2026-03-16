import { action, makeAutoObservable } from 'mobx';
import { ROLES } from './consts';
import { apiService } from '@/services/api/APIService';

export type RoleType = (typeof ROLES)[keyof typeof ROLES];

interface RequestAuthProps {
  username: string;
  password: string;
  role: RoleType;
}

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
  async requestAuth(body: RequestAuthProps) {
    try {
      const requestParams = {
        url: '/auth/reg/',
        body,
      };
      await apiService.post(requestParams);
    } catch (error) {
      throw new Error('RegStore::requestAuth', { cause: error });
    }
  }
}

export const regStore = new RegStore();

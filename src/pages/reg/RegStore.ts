import { action, makeAutoObservable } from 'mobx';
import { ROLES } from './consts';

export type RoleType = (typeof ROLES)[keyof typeof ROLES] | undefined;

class RegStore {
  role: RoleType;

  constructor() {
    makeAutoObservable(this);
  }

  @action.bound
  setRole(role: RoleType) {
    this.role = role;
  }

  clean() {
    this.role = undefined;
  }
}

export const regStore = new RegStore();

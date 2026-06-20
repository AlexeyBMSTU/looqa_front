import { makeAutoObservable, runInAction } from 'mobx';
import { applyAdapter } from '../adapters';
import type { ApplyRequest } from '../types';

class ApplyModel {
  isLoading = false;
  isSuccess = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  reset() {
    this.isLoading = false;
    this.isSuccess = false;
    this.error = null;
  }

  async submit(req: ApplyRequest): Promise<void> {
    this.isLoading = true;
    this.error = null;
    try {
      const res = await applyAdapter(req);
      runInAction(() => {
        this.isSuccess = res.success;
        this.isLoading = false;
      });
    } catch {
      runInAction(() => {
        this.error = 'Не удалось отправить заявку. Попробуйте позже.';
        this.isLoading = false;
      });
    }
  }
}

export const applyModel = new ApplyModel();

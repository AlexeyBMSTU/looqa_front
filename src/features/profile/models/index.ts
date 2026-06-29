import { makeAutoObservable, runInAction } from 'mobx';
import type {
  UserProfile,
  AppliedProject,
  OwnerProject,
  UpdateProfileRequest,
} from '../types';
import {
  getProfileAdapter,
  updateProfileAdapter,
  updateEmailAdapter,
  updatePasswordAdapter,
} from '../adapters';

class ProfileModel {
  profile: UserProfile | null = null;
  applications: AppliedProject[] = [];
  projects: OwnerProject[] = [];
  isLoading = false;
  isSaving = false;
  saveSuccess = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async loadProfile(): Promise<void> {
    if (this.isLoading) return;
    runInAction(() => {
      this.isLoading = true;
      this.error = null;
    });
    try {
      const res = await getProfileAdapter();
      runInAction(() => {
        this.profile = res.profile;
        this.applications = res.applications;
        this.projects = res.projects ?? [];
        this.isLoading = false;
      });
    } catch (e) {
      runInAction(() => {
        // 401 — не техническая ошибка, просто нет данных профиля
        const status = (e as Error & { status?: number }).status;
        if (status !== 401 && status !== 404) {
          this.error =
            e instanceof Error ? e.message : 'Ошибка загрузки профиля';
        }
        this.isLoading = false;
      });
    }
  }

  async updateProfile(req: UpdateProfileRequest): Promise<void> {
    runInAction(() => {
      this.isSaving = true;
      this.saveSuccess = false;
      this.error = null;
    });
    try {
      const res = await updateProfileAdapter(req);
      runInAction(() => {
        this.profile = res.profile;
        this.isSaving = false;
        this.saveSuccess = true;
      });
    } catch (e) {
      runInAction(() => {
        this.error = e instanceof Error ? e.message : 'Ошибка сохранения';
        this.isSaving = false;
      });
    }
  }

  async updateEmail(email: string): Promise<void> {
    runInAction(() => {
      this.isSaving = true;
      this.saveSuccess = false;
      this.error = null;
    });
    try {
      await updateEmailAdapter({ email });
      runInAction(() => {
        if (this.profile) {
          this.profile = { ...this.profile, email, emailVerified: false };
        }
        this.isSaving = false;
        this.saveSuccess = true;
      });
    } catch (e) {
      runInAction(() => {
        this.error = e instanceof Error ? e.message : 'Ошибка привязки email';
        this.isSaving = false;
      });
    }
  }

  async updatePassword(
    currentPassword: string,
    newPassword: string
  ): Promise<void> {
    runInAction(() => {
      this.isSaving = true;
      this.saveSuccess = false;
      this.error = null;
    });
    try {
      await updatePasswordAdapter({ currentPassword, newPassword });
      runInAction(() => {
        this.isSaving = false;
        this.saveSuccess = true;
      });
    } catch (e) {
      runInAction(() => {
        this.error = e instanceof Error ? e.message : 'Ошибка смены пароля';
        this.isSaving = false;
      });
    }
  }

  clearSaveState(): void {
    this.saveSuccess = false;
    this.error = null;
  }
}

export const profileModel = new ProfileModel();

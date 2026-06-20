import { makeAutoObservable, runInAction } from 'mobx';
import type { PublicProfile } from '../types';
import type { Project } from '@/features/feed/types';
import { getPublicProfileAdapter } from '../adapters/public';

class PublicProfileModel {
  profile: PublicProfile | null = null;
  projects: Project[] = [];
  stats = { totalApplications: 0, acceptedApplications: 0 };
  isLoading = false;
  error: string | null = null;
  currentUsername: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async load(username: string) {
    // Не перезагружаем если уже загружен тот же пользователь
    if (this.currentUsername === username && this.profile) return;

    runInAction(() => {
      this.isLoading = true;
      this.error = null;
      this.profile = null;
      this.currentUsername = username;
    });

    try {
      const res = await getPublicProfileAdapter(username);
      runInAction(() => {
        this.profile = res.profile;
        this.projects = res.projects;
        this.stats = res.stats;
        this.isLoading = false;
      });
    } catch (e) {
      runInAction(() => {
        this.error =
          e instanceof Error ? e.message : 'Не удалось загрузить профиль';
        this.isLoading = false;
      });
    }
  }
}

export const publicProfileModel = new PublicProfileModel();

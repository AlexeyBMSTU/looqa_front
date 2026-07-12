import { makeAutoObservable, runInAction } from 'mobx';
import type { PublicProfile } from '../types';
import type { Project } from '@/features/feed/types';
import { getPublicProfileAdapter } from '../adapters/public';
import {
  toggleLikeAdapter,
  addCommentAdapter,
  getCommentsAdapter,
} from '@/features/feed/adapters';

class PublicProfileModel {
  profile: PublicProfile | null = null;
  projects: Project[] = [];
  stats = { totalApplications: 0, acceptedApplications: 0 };
  isLoading = false;
  error: string | null = null;
  currentUsername: string | null = null;
  loadingCommentsFor: string | null = null;

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

  async toggleLike(projectId: string): Promise<void> {
    const project = this.projects.find(p => p.id === projectId);
    if (!project) return;
    runInAction(() => {
      project.isLiked = !project.isLiked;
      project.likesCount += project.isLiked ? 1 : -1;
    });
    try {
      const res = await toggleLikeAdapter(projectId);
      runInAction(() => {
        project.isLiked = res.isLiked;
        project.likesCount = res.likesCount;
      });
    } catch {
      runInAction(() => {
        project.isLiked = !project.isLiked;
        project.likesCount += project.isLiked ? 1 : -1;
      });
    }
  }

  async loadComments(projectId: string): Promise<void> {
    runInAction(() => {
      this.loadingCommentsFor = projectId;
    });
    try {
      const comments = await getCommentsAdapter(projectId);
      runInAction(() => {
        const project = this.projects.find(p => p.id === projectId);
        if (project) project.comments = comments;
        this.loadingCommentsFor = null;
      });
    } catch {
      runInAction(() => {
        this.loadingCommentsFor = null;
      });
    }
  }

  async addComment(projectId: string, text: string): Promise<void> {
    if (!text.trim()) return;
    const res = await addCommentAdapter({ projectId, text });
    runInAction(() => {
      const project = this.projects.find(p => p.id === projectId);
      if (project) {
        project.comments = [...project.comments, res.comment];
        project.commentsCount += 1;
      }
    });
  }
}

export const publicProfileModel = new PublicProfileModel();

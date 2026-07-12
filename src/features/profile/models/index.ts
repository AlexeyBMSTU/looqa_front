import { makeAutoObservable, runInAction } from 'mobx';
import { message } from 'antd';
import type {
  UserProfile,
  AppliedProject,
  UpdateProfileRequest,
} from '../types';
import type { Project } from '@/features/feed/types';
import {
  getProfileAdapter,
  updateProfileAdapter,
  sendEmailVerificationAdapter,
  removeEmailAdapter,
  updatePasswordAdapter,
} from '../adapters';
import {
  toggleLikeAdapter,
  addCommentAdapter,
  getCommentsAdapter,
} from '@/features/feed/adapters';

class ProfileModel {
  profile: UserProfile | null = null;
  applications: AppliedProject[] = [];
  projects: Project[] = [];
  loadingCommentsFor: string | null = null;
  isLoading = false;
  isSaving = false;
  saveSuccess = false;
  // error только для критичных ошибок загрузки — показывается в UI как состояние
  error: string | null = null;
  pendingEmail: string | null = null;
  emailVerificationSent = false;
  emailRemovePending = false;

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
        this.emailRemovePending = false;
      });
    } catch (e) {
      runInAction(() => {
        const status = (e as Error & { status?: number }).status;
        if (status !== 401 && status !== 404) {
          this.error = 'Не удалось загрузить профиль';
        }
        this.isLoading = false;
      });
    }
  }

  async updateProfile(req: UpdateProfileRequest): Promise<void> {
    runInAction(() => {
      this.isSaving = true;
      this.saveSuccess = false;
    });
    try {
      const res = await updateProfileAdapter(req);
      runInAction(() => {
        this.profile = res.profile;
        this.isSaving = false;
        this.saveSuccess = true;
      });
    } catch {
      runInAction(() => {
        this.isSaving = false;
      });
      message.error('Не удалось сохранить профиль');
    }
  }

  async sendEmailVerification(email: string): Promise<void> {
    runInAction(() => {
      this.isSaving = true;
    });
    try {
      await sendEmailVerificationAdapter(email);
      runInAction(() => {
        this.pendingEmail = email;
        this.emailVerificationSent = true;
        this.isSaving = false;
      });
      message.success('Письмо отправлено — проверьте почту');
    } catch {
      runInAction(() => {
        this.isSaving = false;
      });
      // Не раскрываем причину — просто сообщаем об ошибке
      message.error('Не удалось отправить письмо. Попробуйте позже.');
    }
  }

  async removeEmail(): Promise<void> {
    runInAction(() => {
      this.isSaving = true;
    });
    try {
      await removeEmailAdapter();
      runInAction(() => {
        this.isSaving = false;
        this.emailRemovePending = true;
      });
      message.success('Письмо отправлено — подтвердите отвязку почты');
    } catch {
      runInAction(() => {
        this.isSaving = false;
      });
      message.error('Не удалось отправить письмо. Попробуйте позже.');
    }
  }

  handleEmailRemovedEvent(): void {
    runInAction(() => {
      if (this.profile) {
        this.profile = { ...this.profile, email: null, emailVerified: false };
      }
      this.emailRemovePending = false;
      this.emailVerificationSent = false;
      this.pendingEmail = null;
    });
  }

  resetEmailRemoveState(): void {
    this.emailRemovePending = false;
  }

  async updatePassword(
    currentPassword: string,
    newPassword: string
  ): Promise<boolean> {
    runInAction(() => {
      this.isSaving = true;
      this.saveSuccess = false;
    });
    try {
      await updatePasswordAdapter({ currentPassword, newPassword });
      runInAction(() => {
        this.isSaving = false;
        this.saveSuccess = true;
      });
      message.success('Пароль изменён');
      return true;
    } catch {
      runInAction(() => {
        this.isSaving = false;
      });
      // Не раскрываем технические детали (e.g. "current password is incorrect")
      message.error('Не удалось изменить пароль. Проверьте текущий пароль.');
      return false;
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

  clearSaveState(): void {
    this.saveSuccess = false;
    this.error = null;
  }

  resetEmailVerificationState(): void {
    this.emailVerificationSent = false;
    this.pendingEmail = null;
  }
}

export const profileModel = new ProfileModel();

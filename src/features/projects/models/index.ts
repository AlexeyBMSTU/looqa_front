import { makeAutoObservable, runInAction } from 'mobx';
import type { Project } from '@/features/feed/types';
import type {
  CreateProjectRequest,
  SubmitReviewRequest,
  ProjectApplication,
  UpdateApplicationStatusRequest,
} from '../types';
import { authStore } from '@/features/auth/store';
import {
  getProjectAdapter,
  submitReviewAdapter,
  createProjectAdapter,
  getProjectApplicationsAdapter,
  updateApplicationStatusAdapter,
  getMyApplicationAdapter,
} from '../adapters';

class ProjectDetailModel {
  project: Project | null = null;
  isLoading = false;
  error: string | null = null;

  isSubmittingReview = false;
  reviewSuccess = false;

  isCreating = false;
  createSuccess = false;
  createdProjectId: string | null = null;

  // Заявки на тестирование (только для owner)
  applications: ProjectApplication[] = [];
  isLoadingApplications = false;
  isUpdatingApplication: string | null = null;

  // Статус моей заявки (для тестировщика)
  myApplication: ProjectApplication | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get isOwner(): boolean {
    return !!authStore.userID && this.project?.author.id === authStore.userID;
  }

  // Текущий QA зарегистрирован и принят в команду
  get isAcceptedTester(): boolean {
    return this.myApplication?.status === 'accepted';
  }

  async load(id: string): Promise<void> {
    runInAction(() => {
      this.isLoading = true;
      this.error = null;
      this.project = null;
      this.reviewSuccess = false;
      this.applications = [];
      this.myApplication = null;
    });
    try {
      const project = await getProjectAdapter(id);
      runInAction(() => {
        this.project = project;
        this.isLoading = false;
      });
      if (authStore.userID && project.author.id === authStore.userID) {
        // Owner — грузим все заявки
        this.loadApplications(id);
      } else if (authStore.isQA) {
        // QA — грузим только свою заявку
        this.loadMyApplication(id);
      }
    } catch (e) {
      runInAction(() => {
        this.error = e instanceof Error ? e.message : 'Ошибка загрузки';
        this.isLoading = false;
      });
    }
  }

  async loadMyApplication(projectId: string): Promise<void> {
    try {
      const app = await getMyApplicationAdapter(projectId);
      runInAction(() => {
        this.myApplication = app;
      });
    } catch {
      // Нет заявки — это нормально
    }
  }

  async loadApplications(projectId: string): Promise<void> {
    runInAction(() => {
      this.isLoadingApplications = true;
    });
    try {
      const apps = await getProjectApplicationsAdapter(projectId);
      runInAction(() => {
        this.applications = apps;
        this.isLoadingApplications = false;
      });
    } catch {
      runInAction(() => {
        this.isLoadingApplications = false;
      });
    }
  }

  async updateApplicationStatus(
    req: UpdateApplicationStatusRequest
  ): Promise<void> {
    runInAction(() => {
      this.isUpdatingApplication = req.applicationId;
    });
    try {
      const updated = await updateApplicationStatusAdapter(req);
      runInAction(() => {
        const idx = this.applications.findIndex(
          a => a.id === req.applicationId
        );
        if (idx !== -1) this.applications[idx] = updated;
        this.isUpdatingApplication = null;
      });
    } catch (e) {
      runInAction(() => {
        this.isUpdatingApplication = null;
      });
      throw e;
    }
  }

  async submitReview(req: SubmitReviewRequest): Promise<void> {
    runInAction(() => {
      this.isSubmittingReview = true;
    });
    try {
      const review = await submitReviewAdapter(req);
      runInAction(() => {
        if (this.project) {
          this.project = {
            ...this.project,
            reviews: [...(this.project.reviews ?? []), review],
          };
        }
        this.isSubmittingReview = false;
        this.reviewSuccess = true;
      });
    } catch (e) {
      runInAction(() => {
        this.error = e instanceof Error ? e.message : 'Ошибка отправки отзыва';
        this.isSubmittingReview = false;
      });
    }
  }

  async createProject(req: CreateProjectRequest): Promise<Project> {
    runInAction(() => {
      this.isCreating = true;
      this.error = null;
    });
    try {
      const project = await createProjectAdapter(req);
      runInAction(() => {
        this.isCreating = false;
        this.createSuccess = true;
        this.createdProjectId = project.id;
      });
      return project;
    } catch (e) {
      runInAction(() => {
        this.error = e instanceof Error ? e.message : 'Ошибка создания проекта';
        this.isCreating = false;
      });
      throw e;
    }
  }

  resetCreate(): void {
    this.createSuccess = false;
    this.createdProjectId = null;
    this.error = null;
  }
}

export const projectDetailModel = new ProjectDetailModel();

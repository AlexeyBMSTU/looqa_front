import { makeAutoObservable, runInAction } from 'mobx';
import type { Project } from '../types';
import {
  getFeedAdapter,
  toggleLikeAdapter,
  addCommentAdapter,
} from '../adapters';

const PAGE_SIZE = 4;

class FeedModel {
  projects: Project[] = [];
  isLoading = false;
  isLoadingMore = false;
  total = 0;
  private page = 1;

  constructor() {
    makeAutoObservable(this);
  }

  get hasMore(): boolean {
    return this.projects.length < this.total;
  }

  async loadFeed(): Promise<void> {
    if (this.isLoading) return;
    runInAction(() => {
      this.isLoading = true;
      this.page = 1;
      this.projects = [];
      this.total = 0;
    });
    try {
      const res = await getFeedAdapter(1, PAGE_SIZE);
      runInAction(() => {
        this.projects = res.projects;
        this.total = res.total;
        this.isLoading = false;
      });
    } catch {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async loadMore(): Promise<void> {
    if (this.isLoadingMore || !this.hasMore) return;
    runInAction(() => {
      this.isLoadingMore = true;
    });
    try {
      const nextPage = this.page + 1;
      const res = await getFeedAdapter(nextPage, PAGE_SIZE);
      runInAction(() => {
        this.projects = [...this.projects, ...res.projects];
        this.total = res.total;
        this.page = nextPage;
        this.isLoadingMore = false;
      });
    } catch {
      runInAction(() => {
        this.isLoadingMore = false;
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

  async addComment(projectId: string, text: string): Promise<void> {
    if (!text.trim()) return;
    const res = await addCommentAdapter({ projectId, text });
    runInAction(() => {
      const project = this.projects.find(p => p.id === projectId);
      if (project) {
        project.comments = [...project.comments, res.comment];
      }
    });
  }
}

export const feedModel = new FeedModel();

import { apiService } from '@/core/api/APIService';
import { getFlag, FLAGS } from '@/core/featureFlags';
import {
  FeedResponse,
  LikeResponse,
  AddCommentRequest,
  AddCommentResponse,
  Comment,
} from '../types';
import { MOCK_PROJECTS } from '../mocks';

// Mutable copy for mock state
let mockProjects = MOCK_PROJECTS.map(p => ({
  ...p,
  comments: [...p.comments],
}));

async function delay(ms = 400) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// --- Mock implementations ---

async function mockGetFeed(
  page: number,
  pageSize: number
): Promise<FeedResponse> {
  await delay();
  const start = (page - 1) * pageSize;
  const projects = mockProjects.slice(start, start + pageSize);
  return { projects, total: mockProjects.length, page, pageSize };
}

async function mockToggleLike(projectId: string): Promise<LikeResponse> {
  await delay(200);
  const project = mockProjects.find(p => p.id === projectId);
  if (!project) throw new Error(`Project ${projectId} not found`);
  project.isLiked = !project.isLiked;
  project.likesCount += project.isLiked ? 1 : -1;
  return {
    projectId,
    likesCount: project.likesCount,
    isLiked: project.isLiked,
  };
}

async function mockAddComment(
  req: AddCommentRequest
): Promise<AddCommentResponse> {
  await delay(300);
  const project = mockProjects.find(p => p.id === req.projectId);
  if (!project) throw new Error(`Project ${req.projectId} not found`);
  const comment: Comment = {
    id: `c-${Date.now()}`,
    author: { id: 'current-user', username: 'Вы', avatarInitials: 'ВЫ' },
    text: req.text,
    createdAt: new Date().toISOString(),
  };
  project.comments.push(comment);
  return { comment };
}

// --- Public adapter functions ---

export async function getFeedAdapter(
  page = 1,
  pageSize = 10
): Promise<FeedResponse> {
  if (getFlag(FLAGS.MOCK_FEED, true)) {
    // default true — always use mock until backend ready
    return mockGetFeed(page, pageSize);
  }
  return apiService.get<FeedResponse>({
    url: '/feed/',
    query: { page, pageSize },
  });
}

export async function toggleLikeAdapter(
  projectId: string
): Promise<LikeResponse> {
  if (getFlag(FLAGS.MOCK_FEED, true)) {
    return mockToggleLike(projectId);
  }
  return apiService.post<LikeResponse>({ url: `/feed/${projectId}/like/` });
}

export async function addCommentAdapter(
  req: AddCommentRequest
): Promise<AddCommentResponse> {
  if (getFlag(FLAGS.MOCK_FEED, true)) {
    return mockAddComment(req);
  }
  return apiService.post<AddCommentResponse>({
    url: `/feed/${req.projectId}/comments/`,
    body: { text: req.text },
  });
}

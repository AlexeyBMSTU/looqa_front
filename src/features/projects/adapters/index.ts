import { apiService } from '@/core/api/APIService';
import { getFlag, FLAGS } from '@/core/featureFlags';
import { MOCK_PROJECTS } from '@/features/feed/mocks';
import type { Project } from '@/features/feed/types';
import type { Review } from '@/features/feed/types';
import type {
  CreateProjectRequest,
  SubmitReviewRequest,
  ProjectApplication,
  UpdateApplicationStatusRequest,
} from '../types';

async function delay(ms = 500) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Мутируемый мок-стор
let mockProjectsStore: Project[] = MOCK_PROJECTS.map(p => ({ ...p }));

let mockApplications: ProjectApplication[] = [
  {
    id: 'pa-1',
    projectId: '13',
    applicant: { id: 'u2', username: 'Maria_qa', avatarInitials: 'MQ' },
    experience: 'some',
    comment:
      'Работаю с метриками в своей команде, хочу протестировать интеграции.',
    status: 'pending',
    appliedAt: '2026-06-20T11:00:00Z',
  },
  {
    id: 'pa-2',
    projectId: '13',
    applicant: { id: 'u4', username: 'eco_tester', avatarInitials: 'ET' },
    experience: 'none',
    comment: '',
    status: 'pending',
    appliedAt: '2026-06-20T13:30:00Z',
  },
  {
    id: 'pa-3',
    projectId: '13',
    applicant: { id: 'u8', username: 'ux_pro', avatarInitials: 'UP' },
    experience: 'expert',
    comment: 'Занимаюсь аналитикой продуктов, ищу инструменты для команды.',
    status: 'accepted',
    appliedAt: '2026-06-20T15:00:00Z',
  },
];

// --- Mock implementations ---

async function mockGetProject(id: string): Promise<Project> {
  await delay();
  const project = mockProjectsStore.find(p => p.id === id);
  if (!project) throw new Error(`Project ${id} not found`);
  return { ...project };
}

async function mockSubmitReview(req: SubmitReviewRequest): Promise<Review> {
  await delay(400);
  const project = mockProjectsStore.find(p => p.id === req.projectId);
  if (!project) throw new Error(`Project ${req.projectId} not found`);
  const review: Review = {
    id: `r-${Date.now()}`,
    author: { id: 'current-user', username: 'Вы', avatarInitials: 'ВЫ' },
    rating: req.rating,
    text: req.text,
    createdAt: new Date().toISOString(),
  };
  if (!project.reviews) project.reviews = [];
  project.reviews.push(review);
  return review;
}

async function mockCreateProject(req: CreateProjectRequest): Promise<Project> {
  await delay(600);
  const newProject: Project = {
    id: `p-${Date.now()}`,
    title: req.title,
    description: req.description,
    category: req.category,
    tags: req.tags,
    testingSlots: req.testingSlots,
    url: req.url,
    idea: req.idea,
    author: { id: 'current-user', username: 'Вы', avatarInitials: 'ВЫ' },
    likesCount: 0,
    isLiked: false,
    createdAt: new Date().toISOString(),
    attachments: [],
    reviews: [],
    comments: [],
  };
  mockProjectsStore.unshift(newProject);
  return newProject;
}

async function mockGetApplications(
  projectId: string
): Promise<ProjectApplication[]> {
  await delay(300);
  return mockApplications
    .filter(a => a.projectId === projectId)
    .map(a => ({ ...a }));
}

async function mockUpdateApplicationStatus(
  req: UpdateApplicationStatusRequest
): Promise<ProjectApplication> {
  await delay(300);
  const app = mockApplications.find(a => a.id === req.applicationId);
  if (!app) throw new Error(`Заявка ${req.applicationId} не найдена`);
  app.status = req.status;
  return { ...app };
}

// --- Public adapter functions ---

export async function getProjectAdapter(id: string): Promise<Project> {
  if (getFlag(FLAGS.MOCK_FEED)) return mockGetProject(id);
  return apiService.get<Project>({ url: `/projects/${id}/` });
}

export async function submitReviewAdapter(
  req: SubmitReviewRequest
): Promise<Review> {
  if (getFlag(FLAGS.MOCK_FEED)) return mockSubmitReview(req);
  return apiService.post<Review>({
    url: `/projects/${req.projectId}/reviews/`,
    body: { rating: req.rating, text: req.text },
  });
}

export async function createProjectAdapter(
  req: CreateProjectRequest
): Promise<Project> {
  if (getFlag(FLAGS.MOCK_FEED)) return mockCreateProject(req);
  return apiService.post<Project>({ url: '/projects/', body: req });
}

export async function getProjectApplicationsAdapter(
  projectId: string
): Promise<ProjectApplication[]> {
  if (getFlag(FLAGS.MOCK_FEED)) return mockGetApplications(projectId);
  return apiService.get<ProjectApplication[]>({
    url: `/projects/${projectId}/applications/`,
  });
}

export async function updateApplicationStatusAdapter(
  req: UpdateApplicationStatusRequest
): Promise<ProjectApplication> {
  if (getFlag(FLAGS.MOCK_FEED)) return mockUpdateApplicationStatus(req);
  return apiService.patch<ProjectApplication>({
    url: `/projects/${req.projectId}/applications/${req.applicationId}/`,
    body: { status: req.status },
  });
}

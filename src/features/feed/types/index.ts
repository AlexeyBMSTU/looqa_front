export interface Attachment {
  id: string;
  name: string; // имя файла, например "mockup_v2.fig"
  url: string; // ссылка на скачивание
  type: 'figma' | 'pdf' | 'zip' | 'link' | 'other';
}

export interface Review {
  id: string;
  author: Author;
  rating: number; // 1-5
  text: string;
  createdAt: string;
}

export interface Author {
  id: string;
  username: string;
  avatarInitials: string; // e.g. "AB" from username
  avatarColor: string;
  avatarUrl?: string;
}

export interface Comment {
  id: string;
  author: Author;
  text: string;
  createdAt: string; // ISO date string
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string; // e.g. "Мобильное приложение", "Веб-сервис"
  author: Author;
  likesCount: number;
  isLiked: boolean; // current user liked
  commentsCount: number;
  comments: Comment[];
  tags: string[];
  createdAt: string;
  testingSlots: number; // how many testers are still needed
  url?: string;
  idea?: string;
  attachments?: Attachment[];
  reviews?: Review[];
}

export interface FeedResponse {
  projects: Project[];
  total: number;
  page: number;
  pageSize: number;
}

export interface LikeResponse {
  projectId: string;
  likesCount: number;
  isLiked: boolean;
}

export interface AddCommentRequest {
  projectId: string;
  text: string;
}

export interface AddCommentResponse {
  comment: Comment;
}

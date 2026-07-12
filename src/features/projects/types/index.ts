import type { Author, Attachment, Review } from '@/features/feed/types';

export type { Author, Attachment, Review };

export interface ProjectApplication {
  id: string;
  projectId: string;
  applicant: {
    id: string;
    username: string;
    avatarInitials: string;
    avatarColor: string;
  };
  experience: 'none' | 'some' | 'expert';
  comment: string;
  status: 'pending' | 'accepted' | 'rejected';
  appliedAt: string;
}

export interface UpdateApplicationStatusRequest {
  applicationId: string;
  projectId: string;
  status: 'accepted' | 'rejected' | 'pending';
}

export interface CreateProjectRequest {
  title: string;
  description: string;
  category: string;
  tags: string[];
  testingSlots: number;
  url?: string;
  idea?: string;
  attachments?: Array<{ name: string; url: string; type: string }>;
}

export interface SubmitReviewRequest {
  projectId: string;
  rating: number;
  text: string;
}

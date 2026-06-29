import type { Project } from '@/features/feed/types';

export interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  bio: string;
  email: string | null; // null = не привязана
  emailVerified: boolean;
  avatarInitials: string;
  avatarColor: string; // hex, для кастомного фона аватарки
  role: 'qa' | 'owner';
  createdAt: string;
}

export interface AppliedProject {
  id: string;
  projectId: string;
  projectTitle: string;
  projectCategory: string;
  authorUsername: string;
  experience: 'none' | 'some' | 'expert';
  comment: string;
  status: 'pending' | 'accepted' | 'rejected';
  appliedAt: string;
}

export interface UpdateProfileRequest {
  displayName?: string;
  bio?: string;
  avatarColor?: string;
}

export interface UpdateEmailRequest {
  email: string;
}

export interface UpdatePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface OwnerProject {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  testingSlots: number;
  likesCount: number;
  createdAt: string;
}

export interface ProfileResponse {
  profile: UserProfile;
  applications: AppliedProject[];
  projects: OwnerProject[];
}

export interface UpdateProfileResponse {
  profile: UserProfile;
}

// Публичный профиль — видим всем
export interface PublicProfile {
  username: string;
  displayName: string;
  bio: string;
  avatarInitials: string;
  avatarColor: string;
  role: 'qa' | 'owner';
  createdAt: string;
}

export interface PublicProfileResponse {
  profile: PublicProfile;
  // Для owner — полные проекты (тот же Project из feed — чтобы использовать ProjectCard)
  projects: Project[];
  stats: {
    totalApplications: number;
    acceptedApplications: number;
  };
}

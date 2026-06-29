import { apiService } from '@/core/api/APIService';
import { getFlag, FLAGS } from '@/core/featureFlags';
import { MOCK_PROFILE, MOCK_APPLICATIONS } from '../mocks';
import type {
  ProfileResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
  UpdateEmailRequest,
  UpdatePasswordRequest,
} from '../types';

// Mutable copy for mock state
let mockProfile = { ...MOCK_PROFILE };
let mockApplications = [...MOCK_APPLICATIONS];

async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// --- Mock implementations ---

async function mockGetProfile(): Promise<ProfileResponse> {
  await delay(600);
  return {
    profile: { ...mockProfile },
    applications: mockApplications.map(a => ({ ...a })),
    projects: [],
  };
}

async function mockUpdateProfile(
  req: UpdateProfileRequest
): Promise<UpdateProfileResponse> {
  await delay(400);
  if (req.displayName !== undefined) mockProfile.displayName = req.displayName;
  if (req.bio !== undefined) mockProfile.bio = req.bio;
  if (req.avatarColor !== undefined) mockProfile.avatarColor = req.avatarColor;
  return { profile: { ...mockProfile } };
}

async function mockUpdateEmail(): Promise<{ success: boolean }> {
  await delay(400);
  return { success: true };
}

async function mockUpdatePassword(
  req: UpdatePasswordRequest
): Promise<{ success: boolean }> {
  await delay(400);
  if (req.currentPassword.length < 1) {
    throw new Error('Неверный текущий пароль');
  }
  return { success: true };
}

// --- Public adapter functions ---

export async function getProfileAdapter(): Promise<ProfileResponse> {
  if (getFlag(FLAGS.MOCK_PROFILE)) return mockGetProfile();
  return apiService.get<ProfileResponse>({ url: '/profile/' });
}

export async function updateProfileAdapter(
  req: UpdateProfileRequest
): Promise<UpdateProfileResponse> {
  if (getFlag(FLAGS.MOCK_PROFILE)) return mockUpdateProfile(req);
  return apiService.patch<UpdateProfileResponse>({
    url: '/profile/',
    body: req,
  });
}

export async function updateEmailAdapter(
  req: UpdateEmailRequest
): Promise<{ success: boolean }> {
  if (getFlag(FLAGS.MOCK_PROFILE)) return mockUpdateEmail();
  return apiService.post<{ success: boolean }>({
    url: '/profile/email/',
    body: req,
  });
}

export async function updatePasswordAdapter(
  req: UpdatePasswordRequest
): Promise<{ success: boolean }> {
  if (getFlag(FLAGS.MOCK_PROFILE)) return mockUpdatePassword(req);
  return apiService.post<{ success: boolean }>({
    url: '/profile/password/',
    body: req,
  });
}

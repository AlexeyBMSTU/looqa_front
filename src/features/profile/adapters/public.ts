import { apiService } from '@/core/api/APIService';
import { getFlag, FLAGS } from '@/core/featureFlags';
import { MOCK_PUBLIC_PROFILES } from '../mocks/public';
import type { PublicProfileResponse } from '../types';

async function mockGetPublicProfile(
  username: string
): Promise<PublicProfileResponse> {
  await new Promise(r => setTimeout(r, 400));
  const profile = MOCK_PUBLIC_PROFILES[username];
  if (!profile) throw new Error(`Пользователь @${username} не найден`);
  return profile;
}

export async function getPublicProfileAdapter(
  username: string
): Promise<PublicProfileResponse> {
  if (getFlag(FLAGS.MOCK_PROFILE)) return mockGetPublicProfile(username);
  return apiService.get<PublicProfileResponse>({ url: `/users/${username}/` });
}

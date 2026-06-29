import { apiService } from '@/core/api/APIService';
import { getFlag, FLAGS } from '@/core/featureFlags';
import { authStore } from '@/features/auth/store';
import { RequestAuthProps } from '../types';

export interface RegResponse {
  token?: string;
  message?: string;
}

async function mockReg(body: RequestAuthProps): Promise<RegResponse> {
  await new Promise(resolve => setTimeout(resolve, 600));
  if (body.username && body.password && body.role) {
    return {
      token: 'mock-token-reg-12345',
      message: 'Успешная регистрация (мок)',
    };
  }
  throw new Error('Ошибка регистрации (мок)');
}

export async function regAdapter(body: RequestAuthProps): Promise<RegResponse> {
  const res = getFlag(FLAGS.MOCK_AUTH)
    ? await mockReg(body)
    : await apiService.post<RegResponse>({ url: '/auth/reg/', body });

  if (res.token) authStore.setToken(res.token);
  return res;
}

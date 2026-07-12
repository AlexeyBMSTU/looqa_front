import { apiService } from '@/core/api/APIService';
import { getFlag, FLAGS } from '@/core/featureFlags';
import { authStore } from '@/features/auth/store';
import { RequestAuthProps } from '../types';

export interface LoginResponse {
  token?: string;
  message?: string;
}

async function mockLogin(body: RequestAuthProps): Promise<LoginResponse> {
  await new Promise(resolve => setTimeout(resolve, 600));
  if (body.username && body.password) {
    return { token: 'mock-token-12345', message: 'Успешная авторизация (мок)' };
  }
  throw new Error('Неверные учётные данные (мок)');
}

export async function loginAdapter(
  body: RequestAuthProps
): Promise<LoginResponse> {
  const res = getFlag(FLAGS.MOCK_AUTH)
    ? await mockLogin(body)
    : await apiService.post<LoginResponse>({ url: '/auth/login/', body });

  if (res.token) authStore.setToken(res.token);
  return res;
}

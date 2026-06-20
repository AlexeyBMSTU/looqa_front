import { apiService } from '@/core/api/APIService';
import { getFlag, FLAGS } from '@/core/featureFlags';
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
  if (getFlag(FLAGS.MOCK_AUTH)) {
    return mockReg(body);
  }
  return apiService.post<RegResponse>({ url: '/auth/reg/', body });
}

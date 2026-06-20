import { apiService } from '@/core/api/APIService';
import { getFlag, FLAGS } from '@/core/featureFlags';
import type { ApplyRequest, ApplyResponse } from '../types';

async function mockApply(): Promise<ApplyResponse> {
  await new Promise(r => setTimeout(r, 800));
  return {
    success: true,
    message: `Заявка на тестирование проекта отправлена!`,
  };
}

export async function applyAdapter(req: ApplyRequest): Promise<ApplyResponse> {
  if (getFlag(FLAGS.MOCK_APPLY, true)) return mockApply();
  return apiService.post<ApplyResponse>({
    url: `/projects/${req.projectId}/apply/`,
    body: req,
  });
}

import { authStore } from '@/features/auth/store';

export interface UploadResponse {
  url: string;
  filename: string;
  size: number;
}

async function uploadFile(
  endpoint: string,
  file: File
): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch(endpoint, {
    method: 'POST',
    // Не ставим Content-Type — браузер автоматически добавит multipart/form-data с boundary
    headers: {
      Authorization: `Bearer ${authStore.token ?? ''}`,
    },
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Upload failed' }));
    throw new Error(err.error ?? 'Upload failed');
  }
  return res.json();
}

export function uploadAttachment(file: File): Promise<UploadResponse> {
  return uploadFile('/api/upload/attachment/', file);
}

export function uploadAvatar(file: File): Promise<UploadResponse> {
  return uploadFile('/api/upload/avatar/', file);
}

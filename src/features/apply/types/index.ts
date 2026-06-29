export interface ApplyRequest {
  projectId: string;
  username: string;
  experience: string; // 'none' | 'some' | 'expert'
  comment: string;
}

export interface ApplyResponse {
  success: boolean;
  message: string;
  error?: string;
}

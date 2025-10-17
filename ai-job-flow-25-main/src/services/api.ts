import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface UserInfo {
  name: string;
  email: string;
  phone: string;
  skills: string;
  experience: string;
  education: string;
  job_description: string;
  linkedin_profile_url?: string;
}

export interface GenerateDocumentsResponse {
  cv_path: string;
  cover_letter_path: string;
  cv_preview: string;
  cover_letter_preview: string;
}

export interface ApplyJobResponse {
  message: string;
}

export interface UpdateProfileResponse {
  message: string;
  profile_suggestions: string;
}

export const generateDocuments = async (data: UserInfo): Promise<GenerateDocumentsResponse> => {
  const response = await api.post('/generate-documents', data);
  return response.data;
};

export const applyJob = async (jobUrl: string): Promise<ApplyJobResponse> => {
  const response = await api.post('/apply-job', { job_url: jobUrl });
  return response.data;
};

export const updateProfile = async (profileUrl: string): Promise<UpdateProfileResponse> => {
  const response = await api.post('/update-profile', { profile_url: profileUrl });
  return response.data;
};

export const downloadFile = async (filename: string): Promise<Blob> => {
  const response = await api.get(`/download/${filename}`, { responseType: 'blob' });
  return response.data;
};

export default api;

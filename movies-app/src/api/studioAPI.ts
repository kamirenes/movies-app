import { getToken } from '../auth/tokenManager';
import apiRequest from './common/apiRequest';
import APIGetAllStudiosResponse from './types/studio/APIGetAllStudiosResponse';
import APISellMovieRequest from './types/studio/APISellMovieRequest';
import APISellMovieResponse from './types/studio/APISellMovieResponse';

export const getAllStudios = async () => {
  return await apiRequest<APIGetAllStudiosResponse>('/studios', 'GET', {});
};

export const sellMovieToAnotherStudio = async (fields: APISellMovieRequest) => {
  const token = getToken();
  return await apiRequest<APISellMovieResponse>(
    '/transfer',
    'POST',
    { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
    fields,
  );
};

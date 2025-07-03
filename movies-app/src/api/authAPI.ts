import apiRequest from './common/apiRequest';
import APILoginRequest from './types/auth/APILoginRequest';
import APILoginResponse from './types/auth/APILoginResponse';

export const loginFetch = async (credentials: APILoginRequest) => {
  return await apiRequest<APILoginResponse>(
    '/login',
    'POST',
    { 'Content-type': 'application/json' },
    credentials,
  );
};

import { loginFetch } from './authAPI';
import apiRequest from './common/apiRequest';
import APILoginRequest from './types/auth/APILoginRequest';
import APILoginResponse from './types/auth/APILoginResponse';

jest.mock('./common/apiRequest');

const mockApiRequest = apiRequest as jest.MockedFunction<typeof apiRequest>;

describe('loginFetch', () => {
  const credentials: APILoginRequest = {
    email: 'user@example.com',
    password: 'password123',
  } as APILoginRequest;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should call apiRequest with correct arguments and return the answer', async () => {
    const expectedResponse: APILoginResponse = {
      token: 'fake-jwt-token',
    } as unknown as APILoginResponse;

    mockApiRequest.mockResolvedValue(expectedResponse);

    const result = await loginFetch(credentials);

    expect(mockApiRequest).toHaveBeenCalledTimes(1);
    expect(mockApiRequest).toHaveBeenCalledWith(
      '/login',
      'POST',
      { 'Content-type': 'application/json' },
      credentials,
    );
    expect(result).toEqual(expectedResponse);
  });

  it('Should propagate apiRequest errors', async () => {
    const error = new Error('Network error');
    mockApiRequest.mockRejectedValue(error);

    await expect(loginFetch(credentials)).rejects.toThrow(error);
  });
});

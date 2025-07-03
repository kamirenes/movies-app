import apiRequest from './common/apiRequest';
import { getToken } from '../auth/tokenManager';

import APILoginRequest from './types/auth/APILoginRequest';
import APILoginResponse from './types/auth/APILoginResponse';
import APIGetAllStudiosResponse from './types/studio/APIGetAllStudiosResponse';
import APISellMovieRequest from './types/studio/APISellMovieRequest';
import APISellMovieResponse from './types/studio/APISellMovieResponse';
import { loginFetch } from './authAPI';
import { getAllStudios, sellMovieToAnotherStudio } from './studioAPI';

jest.mock('./common/apiRequest');
jest.mock('../auth/tokenManager', () => ({
  getToken: jest.fn(),
}));

const mockApiRequest = apiRequest as jest.MockedFunction<typeof apiRequest>;
const mockGetToken = getToken as jest.MockedFunction<typeof getToken>;

describe('loginFetch', () => {
  const credentials: APILoginRequest = {
    email: 'user@example.com',
    password: 'password123',
  } as APILoginRequest;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should call apiRequest with correct arguments and return the answer', async () => {
    const expectedResponse = {
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

describe('getAllStudios', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should call apiRequest with correct arguments and return the answer', async () => {
    const expectedResponse = {
      studios: [
        { id: '1', name: 'Warner Bros.' },
        { id: '2', name: 'Universal' },
      ],
    } as unknown as APIGetAllStudiosResponse;

    mockApiRequest.mockResolvedValue(expectedResponse);

    const result = await getAllStudios();

    expect(mockApiRequest).toHaveBeenCalledTimes(1);
    expect(mockApiRequest).toHaveBeenCalledWith('/studios', 'GET', {});
    expect(result).toEqual(expectedResponse);
  });

  it('Should propagate apiRequest errors', async () => {
    const error = new Error('Fetch error');
    mockApiRequest.mockRejectedValue(error);

    await expect(getAllStudios()).rejects.toThrow(error);
  });
});

describe('sellMovieToAnotherStudio', () => {
  const fields: APISellMovieRequest = {
    movieId: 'movie-123',
    toStudioId: 'studio-2',
    price: 5000000,
  } as APISellMovieRequest;
  const token = 'valid-token';

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should call getToken and apiRequest with correct arguments and return the answer', async () => {
    mockGetToken.mockReturnValue(token);
    const expectedResponse = {
      success: true,
    } as unknown as APISellMovieResponse;

    mockApiRequest.mockResolvedValue(expectedResponse);

    const result = await sellMovieToAnotherStudio(fields);

    expect(mockGetToken).toHaveBeenCalledTimes(1);
    expect(mockApiRequest).toHaveBeenCalledTimes(1);
    expect(mockApiRequest).toHaveBeenCalledWith(
      '/transfer',
      'POST',
      { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
      fields,
    );
    expect(result).toEqual(expectedResponse);
  });

  it('Should propagate apiRequest errorst', async () => {
    mockGetToken.mockReturnValue(token);
    const error = new Error('Transfer error');
    mockApiRequest.mockRejectedValue(error);

    await expect(sellMovieToAnotherStudio(fields)).rejects.toThrow(error);
  });
});

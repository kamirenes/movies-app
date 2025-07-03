import apiRequest from './common/apiRequest';
import { getAllGenres, getAllMovies } from './moviesAPI';
import APIGetAllGenresResponse from './types/movies/APIGetAllGenresResponse';
import APIGetAllMoviesResponse from './types/movies/APIGetAllMoviesResponse';

jest.mock('./common/apiRequest');

const mockApiRequest = apiRequest as jest.MockedFunction<typeof apiRequest>;

describe('getAllMovies', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should call apiRequest with correct arguments and return the answer', async () => {
    const expectedResponse: APIGetAllMoviesResponse = [
      {
        id: '11',
        name: 'Nightmare before christmas',
        genre: 1,
        img: 'https://www.dimanoinmano.it/img/638590/full/libri-per-ragazzi/infanzia/nightmare-before-christmas.jpg',
        price: 600,
        studioId: '1',
      },
    ];

    mockApiRequest.mockResolvedValue(expectedResponse);

    const result = await getAllMovies();

    expect(mockApiRequest).toHaveBeenCalledTimes(1);
    expect(mockApiRequest).toHaveBeenCalledWith('/movies', 'GET', {});
    expect(result).toEqual(expectedResponse);
  });

  it('Should propagate apiRequest errors', async () => {
    const error = new Error('Network error');
    mockApiRequest.mockRejectedValue(error);

    await expect(getAllMovies()).rejects.toThrow(error);
  });
});

describe('getAllGenres', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should call apiRequest with correct arguments and return the answer', async () => {
    const expectedResponse: APIGetAllGenresResponse = [
      {
        id: 1,
        code: 'HER',
        name: 'heroes',
      },
    ];

    mockApiRequest.mockResolvedValue(expectedResponse);

    const result = await getAllGenres();

    expect(mockApiRequest).toHaveBeenCalledTimes(1);
    expect(mockApiRequest).toHaveBeenCalledWith('/genres', 'GET', {});
    expect(result).toEqual(expectedResponse);
  });

  it('Should propagate apiRequest errors', async () => {
    const error = new Error('Network error');
    mockApiRequest.mockRejectedValue(error);

    await expect(getAllGenres()).rejects.toThrow(error);
  });
});

import { renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react';
import useImageFeaturePage from './useImageFeaturePage';
import * as reduxHooks from '../../hooks/useAppSelector';
import * as dispatchHook from '../../hooks/useAppDispatch';
import { setFilterMoviesRequest } from '../../ducks/movies/slice';
import { defaultAvatar } from '../../constants/constants';

jest.mock('../../hooks/useAppDispatch');
jest.mock('../../hooks/useAppSelector');

describe('useImageFeaturePage', () => {
  const mockDispatch = jest.fn();

  const mockAppSelector = (data: any) => {
    (reduxHooks.useAppSelector as jest.Mock).mockImplementation((selector) =>
      selector(data),
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (dispatchHook.useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);

    mockAppSelector({
      movies: {
        allMovies: {
          data: [{ id: 1, name: 'Movie 1', img: 'https://image.com/test.jpg' }],
          loading: false,
        },
        currentMovies: {
          data: [{ id: 1, name: 'Movie 1', img: 'https://image.com/test.jpg' }],
          loading: false,
        },
        allGenres: { data: [{ id: 1, code: 'ACT' }] },
      },
      studios: {
        allStudios: { data: [{ id: 1, name: 'Studio 1' }], loading: false },
      },
    });

    global.Image = class {
      onload: () => void = () => {};
      onerror: () => void = () => {};
      set src(_url: string) {
        setTimeout(() => this.onload(), 0);
      }
    } as any;
  });

  it('calls setFilterMoviesRequest if movies are empty and originalMovies exist', async () => {
    mockAppSelector({
      movies: {
        allMovies: { data: [{ id: 1, name: 'Original' }], loading: false },
        currentMovies: { data: [], loading: false },
        allGenres: { data: [] },
      },
      studios: { allStudios: { data: [], loading: false } },
    });

    renderHook(() => useImageFeaturePage());

    expect(mockDispatch).toHaveBeenCalledWith(setFilterMoviesRequest({}));
  });

  it('uses defaultAvatar if image fails to load', async () => {
    global.Image = class {
      onload: () => void = () => {};
      onerror: () => void = () => {};
      set src(_url: string) {
        setTimeout(() => this.onerror(), 0);
      }
    } as any;

    const { result } = renderHook(() => useImageFeaturePage());

    await waitFor(() => {
      expect(result.current.formattedMovies[0].img).toBe(defaultAvatar);
    });
  });

  it('proxies wikia and lainformacion images', async () => {
    mockAppSelector({
      movies: {
        allMovies: { data: [], loading: false },
        currentMovies: {
          data: [
            {
              id: 1,
              name: 'Movie X',
              img: 'https://static.wikia.nocookie.net/image.jpg',
            },
          ],
          loading: false,
        },
        allGenres: { data: [] },
      },
      studios: { allStudios: { data: [], loading: false } },
    });

    const { result } = renderHook(() => useImageFeaturePage());

    await waitFor(() => {
      expect(result.current.formattedMovies[0].img).toContain(
        'https://images.weserv.nl/',
      );
    });
  });

  it('returns correct genre code', () => {
    const { result } = renderHook(() => useImageFeaturePage());

    expect(result.current.genreCode(1)).toBe('ACT');
    expect(result.current.genreCode(999)).toBeUndefined();
  });
});

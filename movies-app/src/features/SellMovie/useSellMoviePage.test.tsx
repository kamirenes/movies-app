import {
  renderHook,
  act,
  RenderHookResult,
} from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react';
import useSellMoviePage from './useSellMoviePage';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';

jest.mock('../../hooks/useAppDispatch');
jest.mock('../../hooks/useAppSelector');

const mockDispatch = jest.fn();
(useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);

const mockMovies = [
  { id: '1', name: 'Movie 1', studioId: 'studioA' },
  { id: '2', name: 'Movie 2', studioId: 'studioB' },
];

const mockStudios = [
  { id: 'studioA', name: 'Studio A' },
  { id: 'studioB', name: 'Studio B' },
];

describe('useSellMoviePage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useAppSelector as jest.Mock).mockImplementation((cb: any) =>
      cb({
        movies: { allMovies: { data: mockMovies } },
        studios: {
          allStudios: { data: mockStudios },
          sellMovie: { loading: false, error: null },
        },
      }),
    );
  });

  it('should initialize with correct values', () => {
    const { result } = renderHook(() => useSellMoviePage());

    expect(result.current.fields).toEqual({
      movieId: undefined,
      fromId: undefined,
      toId: undefined,
    });

    expect(result.current.moviesList).toEqual(mockMovies);
    expect(result.current.studios).toEqual(mockStudios);
    expect(result.current.sold).toBe(false);
    expect(result.current.toast.open).toBe(false);
  });

  it('should update fields onChange (normal field)', () => {
    const { result } = renderHook(() => useSellMoviePage());

    act(() => {
      result.current.onChange({ field: 'toId', value: 'studioB' });
    });

    expect(result.current.fields.toId).toBe('studioB');
  });

  it('should update movieId and fromId when onChange with movieId', () => {
    const { result } = renderHook(() => useSellMoviePage());

    act(() => {
      result.current.onChange({ field: 'movieId', value: '1' });
    });

    expect(result.current.fields.movieId).toBe('1');
    expect(result.current.fields.fromId).toBe('studioA');
  });

  it('should not dispatch if some field is missing', () => {
    const { result } = renderHook(() => useSellMoviePage());

    act(() => {
      result.current.onChange({ field: 'movieId', value: '1' });
    });

    act(() => {
      result.current.onSubmit();
    });

    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it('should show success toast after sellMovie success', async () => {
    const selectorMock = useAppSelector as jest.Mock;

    let hookResult: RenderHookResult<unknown, ReturnType<typeof useSellMoviePage>>;

    selectorMock.mockImplementation((cb: any) =>
      cb({
        movies: { allMovies: { data: mockMovies } },
        studios: {
          allStudios: { data: mockStudios },
          sellMovie: { loading: true, error: null },
        },
      }),
    );

    hookResult = renderHook(() => useSellMoviePage());

    act(() => {
      hookResult.result.current.onChange({ field: 'movieId', value: '1' });
    });

    await waitFor(() => {
      expect(hookResult.result.current.fields.movieId).toBe('1');
    });

    selectorMock.mockImplementation((cb: any) =>
      cb({
        movies: { allMovies: { data: mockMovies } },
        studios: {
          allStudios: { data: mockStudios },
          sellMovie: { loading: false, error: null },
        },
      }),
    );

    hookResult.rerender();

    await waitFor(() => {
      expect(hookResult.result.current.toast.open).toBe(true);
    });

    expect(hookResult.result.current.toast.message).toBe('Done!');
    expect(hookResult.result.current.toast.severity).toBe('success');
    expect(hookResult.result.current.fields).toEqual({});
    expect(hookResult.result.current.sold).toBe(true);
  });

  it('should show error toast if sellMovie has error', () => {
    const error = { message: 'Something went wrong' };
    (useAppSelector as jest.Mock).mockImplementation((cb: any) =>
      cb({
        movies: { allMovies: { data: mockMovies } },
        studios: {
          allStudios: { data: mockStudios },
          sellMovie: { loading: false, error },
        },
      }),
    );

    const { result } = renderHook(() => useSellMoviePage());

    expect(result.current.toast.open).toBe(true);
    expect(result.current.toast.message).toBe('Something went wrong');
    expect(result.current.toast.severity).toBe('error');
  });

  it('should close toast on closeToast (not clickaway)', () => {
    const { result } = renderHook(() => useSellMoviePage());

    act(() => {
      result.current.closeToast(undefined, 'timeout');
    });

    expect(result.current.toast.open).toBe(false);
  });

  it('should reset sold on onNewRequest', () => {
    const { result } = renderHook(() => useSellMoviePage());

    act(() => {
      result.current.onNewRequest();
    });

    expect(result.current.sold).toBe(false);
  });
});

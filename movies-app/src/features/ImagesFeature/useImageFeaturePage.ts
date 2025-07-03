import { useEffect, useMemo, useState, useCallback } from 'react';
import { Movie } from './types';
import { defaultAvatar } from '../../constants/constants';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import {
  getAllGenresRequest,
  getAllMoviesRequest,
  setFilterMoviesRequest,
} from '../../ducks/movies/slice';
import { getAllStudiosRequest } from '../../ducks/studios/slice';
import { useAppSelector } from '../../hooks/useAppSelector';

const useImageFeaturePage = () => {
  const dispatch = useAppDispatch();

  const { data: originalMovies, loading: moviesLoading } = useAppSelector(
    (state) => state.movies.allMovies,
  );

  const { data: movies, loading: filterMoviesLoading } = useAppSelector(
    (state) => state.movies.currentMovies,
  );

  const { data: studios, loading: studiosLoading } = useAppSelector(
    (state) => state.studios.allStudios,
  );

  const genres = useAppSelector((state) => state.movies.allGenres.data);

  const loading = useMemo(
    () => filterMoviesLoading || moviesLoading || studiosLoading,
    [filterMoviesLoading, moviesLoading, studiosLoading],
  );

  const [formattedMovies, setFormattedMovies] = useState<Movie[]>([]);

  useEffect(() => {
    dispatch(getAllMoviesRequest());
    dispatch(getAllStudiosRequest());
    dispatch(getAllGenresRequest());
  }, [dispatch]);

  useEffect(() => {
    if (!movies?.length) dispatch(setFilterMoviesRequest({}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [originalMovies]);

  const validateImage = useCallback((url?: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = url ?? '';
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
    });
  }, []);

  const formatMovie = useCallback(
    async (movie: Movie): Promise<Movie> => {
      const isValid = await validateImage(movie?.img);

      const needsProxy =
        movie?.img?.includes('static.wikia.nocookie.net') ||
        movie?.img?.includes('lainformacion.com');

      const finalImage =
        isValid && movie.img
          ? needsProxy
            ? `https://images.weserv.nl/?url=${encodeURIComponent(
                movie.img.replace(/^https?:\/\//, ''),
              )}`
            : movie.img
          : defaultAvatar;

      return { ...movie, img: finalImage };
    },
    [validateImage],
  );

  useEffect(() => {
    if (!movies?.length) {
      setFormattedMovies([]);
      return;
    }

    const process = async () => {
      const results = await Promise.all(movies.map(formatMovie));
      setFormattedMovies(results);
    };

    process();
  }, [movies, formatMovie]);

  const genreCode = useCallback(
    (genreId: number) => genres?.find((item) => item.id === genreId)?.code,
    [genres],
  );

  return {
    formattedMovies,
    loading,
    studios,
    genreCode,
  };
};

export default useImageFeaturePage;

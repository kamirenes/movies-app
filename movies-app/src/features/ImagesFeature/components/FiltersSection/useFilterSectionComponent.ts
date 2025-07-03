import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { TMovieFilters } from './types';
import {
  getAllGenresRequest,
  setFilterMoviesRequest,
} from '../../../../ducks/movies/slice';
import { useAppSelector } from '../../../../hooks/useAppSelector';

const useFilterSectionComponent = () => {
  const dispatch = useAppDispatch();

  const { data: genresList, loading: genresListLoading } = useAppSelector(
    (state) => state.movies.allGenres,
  );

  const defaultFilters = {
    genre: undefined,
    maxPrice: undefined,
    minPrice: undefined,
    title: undefined,
  };

  const [filters, setFilters] = useState<TMovieFilters>(defaultFilters);

  const onChange = (field: keyof TMovieFilters, value?: string | number) => {
    setFilters({ ...filters, [field]: value });
  };

  useEffect(() => {
    if (!genresList && !genresListLoading) dispatch(getAllGenresRequest());
  }, [dispatch, genresList, genresListLoading]);

  useEffect(() => {
    dispatch(setFilterMoviesRequest(filters));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const cleanFilters = () => {
    setFilters(defaultFilters);
  };

  return {
    filters,
    genresList,
    cleanFilters,
    onChange,
  };
};

export default useFilterSectionComponent;

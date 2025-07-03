import { PayloadAction } from '@reduxjs/toolkit';
import TError from '../../common/types/TError';
import { Genre, Movie } from '../../features/ImagesFeature/types';

export type MoviesState = {
  allMovies: {
    data: Movie[];
    loading: boolean;
    error?: TError;
  };
  currentMovies: {
    data?: Movie[];
    loading: boolean;
    error?: TError;
  };
  allGenres: {
    data?: Genre[];
    loading: boolean;
    error?: TError;
  };
};

export type GetAllMoviesSuccessAction = PayloadAction<Movie[]>;

type SetFilterMoviesRequestPayloadAction = {
  genre?: number;
  title?: string;
  minPrice?: number;
  maxPrice?: number;
};

export type SetFilterMoviesRequestAction =
  PayloadAction<SetFilterMoviesRequestPayloadAction>;

export type SetFilterMoviesSuccessAction = PayloadAction<Movie[]>;

export type GetAllGenresSuccessAction = PayloadAction<Genre[]>;

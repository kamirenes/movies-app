import { createSlice } from '@reduxjs/toolkit';
import {
  GetAllGenresSuccessAction,
  GetAllMoviesSuccessAction,
  MoviesState,
  SetFilterMoviesRequestAction,
} from './types';
import CommonFailureAction from '../../common/types/CommonFailureAction';

const initialState: MoviesState = {
  allMovies: {
    data: [],
    loading: false,
    error: undefined,
  },
  currentMovies: {
    data: undefined,
    loading: false,
    error: undefined,
  },
  allGenres: {
    data: undefined,
    loading: false,
    error: undefined,
  },
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    getAllMoviesRequest: (state) => {
      state.allMovies.loading = true;
    },
    getAllMoviesSuccess: (state, action: GetAllMoviesSuccessAction) => {
      state.allMovies.loading = false;
      state.allMovies.data = action.payload;
    },
    getAllMoviesFailure: (state, action: CommonFailureAction) => {
      state.allMovies.loading = false;
      state.allMovies.error = action.payload;
    },

    /** Filter movies */
    setFilterMoviesRequest: (state, _action: SetFilterMoviesRequestAction) => {
      state.currentMovies.loading = true;
    },
    setFilterMoviesSuccess: (state, action: GetAllMoviesSuccessAction) => {
      state.currentMovies.loading = false;
      state.currentMovies.data = action.payload;
    },
    setFilterMoviesFailure: (state, action: CommonFailureAction) => {
      state.currentMovies.loading = false;
      state.currentMovies.error = action.payload;
    },

    /** Get all Genres */
    getAllGenresRequest: (state) => {
      state.allGenres.loading = true;
    },
    getAllGenresSuccess: (state, action: GetAllGenresSuccessAction) => {
      state.allGenres.loading = false;
      state.allGenres.data = action.payload;
    },
    getAllGenresFailure: (state, action: CommonFailureAction) => {
      state.allGenres.loading = false;
      state.allGenres.error = action.payload;
    },
  },
});

export const {
  getAllMoviesRequest,
  getAllMoviesSuccess,
  getAllMoviesFailure,
  setFilterMoviesRequest,
  setFilterMoviesSuccess,
  setFilterMoviesFailure,
  getAllGenresRequest,
  getAllGenresSuccess,
  getAllGenresFailure,
} = moviesSlice.actions;

export default moviesSlice.reducer;

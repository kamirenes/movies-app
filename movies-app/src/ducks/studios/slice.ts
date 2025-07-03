import { createSlice } from '@reduxjs/toolkit';
import CommonFailureAction from '../../common/types/CommonFailureAction';
import {
  GetAllStudiosSuccessAction,
  SellMovieRequestAction,
  StudiosState,
} from './type';

const initialState: StudiosState = {
  allStudios: {
    data: [],
    loading: false,
    error: undefined,
  },
  sellMovie: {
    loading: false,
    error: undefined,
  },
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    getAllStudiosRequest: (state) => {
      state.allStudios.loading = true;
    },
    getAllStudiosSuccess: (state, action: GetAllStudiosSuccessAction) => {
      state.allStudios.loading = false;
      state.allStudios.data = action.payload;
    },
    getAllStudiosFailure: (state, action: CommonFailureAction) => {
      state.allStudios.loading = false;
      state.allStudios.error = action.payload;
    },
    sellMovieRequest: (state, action: SellMovieRequestAction) => {
      state.sellMovie.loading = true;
    },
    sellMovieSuccess: (state) => {
      state.sellMovie.loading = false;
    },
    sellMovieFailure: (state, action: CommonFailureAction) => {
      state.sellMovie.loading = false;
      state.sellMovie.error = action.payload;
    },
  },
});

export const {
  getAllStudiosRequest,
  getAllStudiosSuccess,
  getAllStudiosFailure,
  sellMovieRequest,
  sellMovieSuccess,
  sellMovieFailure,
} = moviesSlice.actions;

export default moviesSlice.reducer;

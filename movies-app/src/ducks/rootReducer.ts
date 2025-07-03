import { combineReducers } from '@reduxjs/toolkit';
import { store } from './store';
import moviesReducer from './movies/slice';
import studiosReducer from './studios/slice';
import authReducer from './auth/slice';

const rootReducer = combineReducers({
  auth: authReducer,
  movies: moviesReducer,
  studios: studiosReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export default rootReducer;

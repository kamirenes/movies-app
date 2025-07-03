import { all } from 'redux-saga/effects';
import moviesSaga from './moviesSaga';
import studiosSaga from './studiosSaga';
import authSaga from './authSaga';

export default function* rootSaga() {
  yield all([moviesSaga(), studiosSaga(), authSaga()]);
}

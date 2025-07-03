import { SagaIterator } from 'redux-saga';
import { Studio } from '../features/ImagesFeature/types';
import APIError from '../api/types/APIError';
import { call, put, takeLatest } from 'redux-saga/effects';
import HttpStatusCode from '../api/common/HTTPStatusCode';
import {
  getAllStudiosFailure,
  getAllStudiosRequest,
  getAllStudiosSuccess,
  sellMovieFailure,
  sellMovieRequest,
  sellMovieSuccess,
} from '../ducks/studios/slice';
import { getAllStudios, sellMovieToAnotherStudio } from '../api/studioAPI';
import { SellMovieRequestAction } from '../ducks/studios/type';
import APISellMovieResponse from '../api/types/studio/APISellMovieResponse';
import { getAllMoviesRequest } from '../ducks/movies/slice';

function* getAllStudiosSaga(): SagaIterator {
  try {
    const response: Studio[] | APIError = yield call(getAllStudios);

    if (response && 'status' in response && 'message' in response) {
      yield put(getAllStudiosFailure(response));
    } else {
      yield put(getAllStudiosSuccess(response as Studio[]));
    }
  } catch (error) {
    yield put(getAllStudiosFailure({ status: HttpStatusCode.BAD_REQUEST }));
  }
}

function* SellMovieSaga(action: SellMovieRequestAction): SagaIterator {
  try {
    const response: APISellMovieResponse | APIError = yield call(
      sellMovieToAnotherStudio,
      action.payload,
    );

    if (response && 'status' in response) {
      yield put(sellMovieFailure(response));
    } else {
      yield put(sellMovieSuccess());
      yield put(getAllMoviesRequest());
    }
  } catch (error) {
    yield put(sellMovieFailure({ status: HttpStatusCode.BAD_REQUEST }));
  }
}

function* studiosSaga() {
  yield takeLatest(getAllStudiosRequest.type, getAllStudiosSaga);
  yield takeLatest(sellMovieRequest.type, SellMovieSaga);
}

export default studiosSaga;

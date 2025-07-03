import { SagaIterator } from 'redux-saga';
import { Genre, Movie } from '../features/ImagesFeature/types';
import APIError from '../api/types/APIError';
import { getAllGenres, getAllMovies } from '../api/moviesAPI';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getAllGenresFailure,
  getAllGenresRequest,
  getAllGenresSuccess,
  getAllMoviesFailure,
  getAllMoviesRequest,
  getAllMoviesSuccess,
  setFilterMoviesFailure,
  setFilterMoviesRequest,
  setFilterMoviesSuccess,
} from '../ducks/movies/slice';
import HttpStatusCode from '../api/common/HTTPStatusCode';
import { SetFilterMoviesRequestAction } from '../ducks/movies/types';
import { getState } from '../ducks/store';

function* getAllMoviesSaga(): SagaIterator {
  try {
    const response: Movie[] | APIError = yield call(getAllMovies);

    if (response && 'status' in response && 'message' in response) {
      yield put(getAllMoviesFailure(response));
    } else {
      yield put(getAllMoviesSuccess(response as Movie[]));
    }
  } catch (error) {
    yield put(getAllMoviesFailure({ status: HttpStatusCode.BAD_REQUEST }));
  }
}

function* setFilterMoviesSaga(
  action: SetFilterMoviesRequestAction,
): SagaIterator {
  try {
    const { genre, minPrice, maxPrice, title } = action.payload;

    const {
      movies: { allMovies },
    } = getState();

    let originalData = allMovies.data;

    if (
      genre !== undefined &&
      genre !== null &&
      genre !== 0 &&
      typeof genre === 'number'
    ) {
      originalData = originalData.filter((movie) => movie.genre === genre);
    }

    if (minPrice || maxPrice) {
      originalData = originalData.filter((movie) => {
        return (
          movie.price >= (minPrice ?? 0) &&
          movie.price <=
            (maxPrice
              ? typeof maxPrice === 'number'
                ? maxPrice
                : parseFloat(maxPrice)
              : Infinity)
        );
      });
    }

    if (title) {
      originalData = originalData.filter((movie) =>
        movie.name.toLowerCase().includes(title.toLowerCase()),
      );
    }

    yield put(setFilterMoviesSuccess(originalData));
  } catch (error) {
    yield put(setFilterMoviesFailure({ status: HttpStatusCode.BAD_REQUEST }));
  }
}

function* getAllGenresSaga(): SagaIterator {
  try {
    const response: Genre[] | APIError = yield call(getAllGenres);

    if (response && 'status' in response && 'message' in response) {
      yield put(getAllGenresFailure(response));
    } else {
      yield put(getAllGenresSuccess(response as Genre[]));
    }
  } catch (error) {
    yield put(getAllGenresFailure({ status: HttpStatusCode.BAD_REQUEST }));
  }
}

function* moviesSaga() {
  yield takeLatest(getAllMoviesRequest.type, getAllMoviesSaga);
  yield takeLatest(setFilterMoviesRequest.type, setFilterMoviesSaga);
  yield takeLatest(getAllGenresRequest.type, getAllGenresSaga);
}

export default moviesSaga;

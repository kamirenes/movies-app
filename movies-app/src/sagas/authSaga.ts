import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import { loginFailure, loginRequest, loginSuccess } from '../ducks/auth/slice';
import APILoginResponse from '../api/types/auth/APILoginResponse';
import APIError from '../api/types/APIError';
import { loginFetch } from '../api/authAPI';
import HttpStatusCode from '../api/common/HTTPStatusCode';
import { LoginFetchRequestAction } from '../ducks/auth/types';

function* loginSaga(action: LoginFetchRequestAction): SagaIterator {
  try {
    const response: APILoginResponse | APIError = yield call(
      loginFetch,
      action.payload,
    );

    yield put(loginSuccess((response as APILoginResponse).user));
  } catch (error) {
    yield put(loginFailure({ status: HttpStatusCode.BAD_REQUEST }));
  }
}

function* authSaga() {
  yield takeLatest(loginRequest.type, loginSaga);
}

export default authSaga;

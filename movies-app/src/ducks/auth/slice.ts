import { createSlice } from '@reduxjs/toolkit';
import {
  AuthState,
  CheckAuthenticationAction,
  LoginFetchRequestAction,
  LoginFetchSuccessAction,
} from './types';
import { removeToken, storeToken } from '../../auth/tokenManager';
import CommonFailureAction from '../../common/types/CommonFailureAction';

const initialState: AuthState = {
  isAuthenticated: false,
  user: {
    id: undefined,
    name: undefined,
    email: undefined,
  },
  login: {
    loading: false,
    error: undefined,
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    loginRequest: (state, _action: LoginFetchRequestAction) => {
      state.isAuthenticated = false;
      state.login.loading = true;
    },
    loginSuccess: (state, action: LoginFetchSuccessAction) => {
      state.login.loading = false;
      state.isAuthenticated = true;
      state.user = {
        id: action.payload.id,
        name: action.payload.name,
        email: action.payload.email,
      };
      storeToken(action.payload.token);
    },
    loginFailure: (state, action: CommonFailureAction) => {
      state.login.loading = false;
      state.login.error = action.payload;
    },
    authenticationCheck: (state, action: CheckAuthenticationAction) => {
      state.isAuthenticated = action.payload.isAuth;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      removeToken();
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
  authenticationCheck,
} = authSlice.actions;
export default authSlice.reducer;

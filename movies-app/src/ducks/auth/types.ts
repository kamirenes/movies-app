import { PayloadAction } from '@reduxjs/toolkit';
import TError from '../../common/types/TError';

export type AuthState = {
  user: User;
  isAuthenticated: boolean;
  login: {
    loading: boolean;
    error?: TError;
  };
};

export type User = {
  id?: number;
  name?: string;
  email?: string;
};

export type Credentials = {
  email?: string;
  password?: string;
};

export type LoginFetchRequestAction = PayloadAction<Credentials>;

export type LoginFetchSuccessAction = PayloadAction<User & { token: string }>;

export type CheckAuthenticationAction = PayloadAction<{ isAuth: boolean }>;

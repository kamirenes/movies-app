import { PayloadAction } from '@reduxjs/toolkit';
import TError from '../../common/types/TError';
import { Studio } from '../../features/ImagesFeature/types';

export type StudiosState = {
  allStudios: {
    data: Studio[];
    loading: boolean;
    error?: TError;
  };
  sellMovie: {
    loading: boolean;
    error?: TError;
  };
};

export type GetAllStudiosSuccessAction = PayloadAction<Studio[]>;

export type TSellMovieFields = {
  movieId?: string;
  toId?: string;
  fromId?: string;
};

export type SellMovieRequestAction = PayloadAction<TSellMovieFields>;

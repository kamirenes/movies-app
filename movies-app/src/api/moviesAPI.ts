import apiRequest from './common/apiRequest';
import APIGetAllGenresResponse from './types/movies/APIGetAllGenresResponse';
import APIGetAllMoviesResponse from './types/movies/APIGetAllMoviesResponse';

export const getAllMovies = async () => {
  return await apiRequest<APIGetAllMoviesResponse>('/movies', 'GET', {});
};

export const getAllGenres = async () => {
  return await apiRequest<APIGetAllGenresResponse>('/genres', 'GET', {});
};

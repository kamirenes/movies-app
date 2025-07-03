import { useDispatch } from 'react-redux';
import { AppDispatch } from '../ducks/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();

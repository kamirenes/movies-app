import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../ducks/rootReducer';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

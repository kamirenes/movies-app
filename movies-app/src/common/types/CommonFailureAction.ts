import { PayloadAction } from '@reduxjs/toolkit';
import TError from './TError';

type CommonFailureAction = PayloadAction<TError>;

export default CommonFailureAction;

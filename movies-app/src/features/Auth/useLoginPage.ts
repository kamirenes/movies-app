import { loginRequest } from '../../ducks/auth/slice';
import { Credentials } from '../../ducks/auth/types';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useCallback, useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { getToken } from '../../auth/tokenManager';
import { useNavigate } from 'react-router-dom';

const useLoginPage = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [credentials, setCredentials] = useState<Credentials>({
    email: undefined,
    password: undefined,
  });

  const user = useAppSelector((state) => state.auth.user);

  const loading = useAppSelector((state) => state.auth.login.loading);

  const isAuth = useCallback(() => {
    if (user) {
      const toke = getToken();
      if (toke) return navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    isAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const onChange = (value: string, field: keyof Credentials) => {
    setCredentials({ ...credentials, [field]: value });
  };

  const onSubmit = () => {
    if (credentials.password && credentials.email)
      dispatch(loginRequest(credentials));
  };

  return {
    credentials,
    loading,
    onChange,
    onSubmit,
  };
};

export default useLoginPage;

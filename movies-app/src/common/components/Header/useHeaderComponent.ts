import { ChangeEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { authenticationCheck, logout } from '../../../ducks/auth/slice';
import { getToken } from '../../../auth/tokenManager';

const useHeaderComponent = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const onLogin = () => {
    navigate('/login');
  };

  const onLogout = async () => {
    await dispatch(logout());
    navigate('/login');
  };

  const isAuth = useAppSelector((state) => state.auth.isAuthenticated);

  const handleChange = (_event: ChangeEvent<{}>, newValue: number) => {
    if (newValue === 1) navigate('/transfers');
    else navigate('/');
  };

  const token = getToken();

  useEffect(() => {
    if (token) dispatch(authenticationCheck({ isAuth: true }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return {
    isAuth,
    handleChange,
    onLogin,
    onLogout,
  };
};

export default useHeaderComponent;

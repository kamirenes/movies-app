import { renderHook, act } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react';
import useHeaderComponent from './useHeaderComponent';
import { authenticationCheck, logout } from '../../../ducks/auth/slice';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockDispatch = jest.fn();
const mockSelector = jest.fn();

jest.mock('../../../hooks/useAppDispatch', () => ({
  useAppDispatch: () => mockDispatch,
}));

jest.mock('../../../hooks/useAppSelector', () => ({
  useAppSelector: (fn: any) => mockSelector(fn),
}));

const logoutAction = { type: 'auth/logout' };
const authenticationCheckAction = (payload: any) => ({
  type: 'auth/authenticationCheck',
  payload,
});

jest.mock('../../../ducks/auth/slice', () => ({
  logout: jest.fn(() => logoutAction),
  authenticationCheck: jest.fn((payload: any) =>
    authenticationCheckAction(payload),
  ),
}));

const mockGetToken = jest.fn();

jest.mock('../../../auth/tokenManager', () => ({
  getToken: () => mockGetToken(),
}));

describe('useHeaderComponent hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSelector.mockImplementation((fn: any) =>
      fn({ auth: { isAuthenticated: false } }),
    );
  });

  it('returns isAuth from selector', () => {
    mockSelector.mockImplementation((fn: any) =>
      fn({ auth: { isAuthenticated: true } }),
    );
    const { result } = renderHook(() => useHeaderComponent());
    expect(result.current.isAuth).toBe(true);
  });

  it('onLogin should navigate to /login', () => {
    const { result } = renderHook(() => useHeaderComponent());
    act(() => {
      result.current.onLogin();
    });
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  it('onLogout should dispatch logout and navigate to /login', async () => {
    mockDispatch.mockResolvedValue(undefined);

    const { result } = renderHook(() => useHeaderComponent());
    await act(async () => {
      await result.current.onLogout();
    });
    expect(logout).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  it('handleChange navigates to /transfers when newValue is 1', () => {
    const { result } = renderHook(() => useHeaderComponent());
    act(() => {
      const evt = { type: 'click' } as any;
      result.current.handleChange(evt, 1);
    });
    expect(mockNavigate).toHaveBeenCalledWith('/transfers');
  });

  it('handleChange navigates to / when newValue is not 1', () => {
    const { result } = renderHook(() => useHeaderComponent());
    act(() => {
      const evt = { type: 'click' } as any;
      result.current.handleChange(evt, 0);
    });
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('dispatches authenticationCheck when token exists', async () => {
    mockGetToken.mockReturnValue('jwt');
    mockSelector.mockImplementation((fn: any) =>
      fn({ auth: { isAuthenticated: false } }),
    );

    renderHook(() => useHeaderComponent());

    await waitFor(() => expect(mockDispatch).toHaveBeenCalled());

    expect(mockDispatch).toHaveBeenCalledWith(mockDispatch.mock.calls[0][0]);
  });
  it('does not dispatch authenticationCheck when token is absent', async () => {
    mockGetToken.mockReturnValue(null);
    renderHook(() => useHeaderComponent());

    await waitFor(() => expect(mockDispatch).not.toHaveBeenCalled());
    expect(authenticationCheck).not.toHaveBeenCalled();
  });
});

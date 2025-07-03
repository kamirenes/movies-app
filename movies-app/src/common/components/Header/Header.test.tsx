import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';
import useHeaderComponent from './useHeaderComponent';

jest.mock(
  '../FilterDrawer/FilterDrawer',
  () =>
    ({ child }: { child: JSX.Element }) => (
      <div data-testid="mock-filter-drawer">{child}</div>
    ),
);

const mockOnLogin = jest.fn();
const mockOnLogout = jest.fn();
const mockHandleChange = jest.fn();

jest.mock('./useHeaderComponent', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    isAuth: false,
    onLogin: mockOnLogin,
    onLogout: mockOnLogout,
    handleChange: mockHandleChange,
  })),
}));

const useComponentMock = useHeaderComponent as jest.MockedFunction<
  typeof useHeaderComponent
>;

describe('<Header />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders FilterDrawer when drawerChild is provided', () => {
    useComponentMock.mockReturnValue({
      isAuth: false,
      onLogin: mockOnLogin,
      onLogout: mockOnLogout,
      handleChange: mockHandleChange,
    } as any);

    render(<Header currentTab={0} drawerChild={<div>Drawer Content</div>} />);

    expect(screen.getByTestId('mock-filter-drawer')).toBeInTheDocument();
  });

  it('shows Log-in button when not authenticated and triggers onLogin when clicked', () => {
    useComponentMock.mockReturnValue({
      isAuth: false,
      onLogin: mockOnLogin,
      onLogout: mockOnLogout,
      handleChange: mockHandleChange,
    } as any);

    render(<Header currentTab={0} />);

    const loginButton = screen.getByRole('button', { name: /log-in/i });
    expect(loginButton).toBeInTheDocument();

    fireEvent.click(loginButton);
    expect(mockOnLogin).toHaveBeenCalledTimes(1);
  });

  it('shows Log-out button when authenticated and triggers onLogout when clicked', () => {
    useComponentMock.mockReturnValue({
      isAuth: true,
      onLogin: mockOnLogin,
      onLogout: mockOnLogout,
      handleChange: mockHandleChange,
    } as any);

    render(<Header currentTab={0} />);

    const logoutButton = screen.getByRole('button', { name: /log-out/i });
    expect(logoutButton).toBeInTheDocument();

    fireEvent.click(logoutButton);
    expect(mockOnLogout).toHaveBeenCalledTimes(1);
  });

  it('calls handleChange when a different tab is clicked', () => {
    useComponentMock.mockReturnValue({
      isAuth: false,
      onLogin: mockOnLogin,
      onLogout: mockOnLogout,
      handleChange: mockHandleChange,
    } as any);

    render(<Header currentTab={0} />);

    const sellMovieTab = screen.getByRole('tab', { name: /sell movie/i });
    fireEvent.click(sellMovieTab);

    expect(mockHandleChange).toHaveBeenCalled();
  });
});

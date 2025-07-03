import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import FilterDrawer from './FilterDrawer';

const TestChild = () => <div data-testid="drawer-child">Drawer Content</div>;

describe('<FilterDrawer />', () => {
  it('opens the Drawer and displays children when the icon is clicked', async () => {
    render(<FilterDrawer child={<TestChild />} />);

    expect(screen.queryByTestId('drawer-child')).not.toBeInTheDocument();

    const button = screen.getByRole('button', { name: /menu/i });
    await userEvent.click(button);

    expect(await screen.findByTestId('drawer-child')).toBeInTheDocument();
  });
});

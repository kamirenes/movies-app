import { AppBar, Box, Button, Tab, Tabs, Toolbar } from '@material-ui/core';
import FilterDrawer from '../FilterDrawer/FilterDrawer';
import useHeaderComponent from './useHeaderComponent';

const Header = ({
  currentTab,
  drawerChild,
}: {
  currentTab: number;
  drawerChild?: JSX.Element;
}) => {
  const { isAuth, onLogin, onLogout, handleChange } = useHeaderComponent();

  return (
    <AppBar position="static">
      <Toolbar>
        {drawerChild ? <FilterDrawer child={drawerChild} /> : <></>}
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={currentTab}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Movies" />
            <Tab label="Sell Movie" />
          </Tabs>
        </Box>

        {isAuth ? (
          <Button
            color="inherit"
            style={{ marginLeft: 'auto' }}
            onClick={onLogout}
          >
            Log-out
          </Button>
        ) : (
          <Button
            color="inherit"
            style={{ marginLeft: 'auto' }}
            onClick={onLogin}
          >
            Log-in
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;

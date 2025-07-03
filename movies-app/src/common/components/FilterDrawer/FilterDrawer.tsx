import { IconButton } from '@material-ui/core';
import Drawer from '@mui/material/Drawer';
import { Fragment } from 'react';
import useFilterDrawerComponent from './useFilterDrawerComponent';
import FilterIcon from '@mui/icons-material/FilterListRounded';

const FilterDrawer = ({ child }: { child: JSX.Element }) => {
  const { state, toggleDrawer } = useFilterDrawerComponent();
  return (
    <div>
      {(['left'] as const).map((anchor) => (
        <Fragment key={anchor}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            style={{ marginRight: 8 }}
            onClick={toggleDrawer(anchor, true)}
          >
            <FilterIcon />
          </IconButton>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {child}
          </Drawer>
        </Fragment>
      ))}
    </div>
  );
};

export default FilterDrawer;

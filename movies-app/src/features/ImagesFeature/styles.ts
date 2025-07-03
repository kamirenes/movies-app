import { makeStyles } from '@material-ui/core/styles';

export const useAppStyles = makeStyles(() => ({
  regularCard: {
    padding: 16,
    margin: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  smallCard: {
    padding: 8,
    margin: 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: 5,
  },
}));

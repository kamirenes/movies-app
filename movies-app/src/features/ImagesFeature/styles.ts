import { makeStyles } from '@material-ui/core/styles';

export const useAppStyles = makeStyles((theme) => ({
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    padding: 16,
    margin: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      padding: 8,
      margin: 8,
    },
  },
  avatar: {
    width: 280,
    height: 280,
    margin: 5,
    [theme.breakpoints.down('xs')]: {
      width: 60,
      height: 60,
    },
  },
  container: {
    margin: 16,
  },
}));

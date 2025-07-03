import { makeStyles } from '@material-ui/core/styles';

export const sellStyles = makeStyles(() => ({
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 48,
  },
  container: {
    display: 'flex',
    gap: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  field: {
    width: 200,
    marginRight: 16,
  },
}));

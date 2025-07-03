import { makeStyles } from '@material-ui/core/styles';

export const authStyles = makeStyles(() => ({
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
  title: {
    marginTop: 48,
    marginBottom: 24,
  },
}));

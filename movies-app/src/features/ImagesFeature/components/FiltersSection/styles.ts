import { makeStyles } from '@material-ui/core/styles';

export const filterSectionStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    gap: 16,
    flexDirection: 'column',
    flexWrap: 'wrap',
    margin: 16,
  },
  field: {
    width: 200,
  },
}));

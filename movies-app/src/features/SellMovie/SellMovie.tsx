import Header from '../../common/components/Header/Header';
import {
  Box,
  Button,
  Snackbar,
  TextField,
  Typography,
} from '@material-ui/core';
import { sellStyles } from './styles';
import useSellMoviePage from './useSellMoviePage';
import { Alert, Autocomplete } from '@mui/material';
import { LoadingButton } from '@mui/lab';

const SellMovie = () => {
  const styles = sellStyles();

  const {
    fields,
    moviesList,
    loading,
    sold,
    studios,
    toast,
    closeToast,
    onChange,
    onNewRequest,
    onSubmit,
  } = useSellMoviePage();
  return (
    <div>
      <Header currentTab={1} />
      <div className={styles.pageContainer}>
        <Typography variant="h4" component="h2">
          Sell movie to another studio
        </Typography>

        {sold ? (
          <Box className={styles.container}>
            <Button onClick={onNewRequest} variant="contained">
              New Process
            </Button>
          </Box>
        ) : (
          <Box className={styles.container}>
            <Autocomplete
              disablePortal
              options={moviesList}
              getOptionLabel={(option) => option.name}
              isOptionEqualToValue={(opt, val) => opt.id === val.id}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Movie" />}
              onChange={(_e, newValue) =>
                onChange({ value: newValue?.id?.toString(), field: 'movieId' })
              }
            />

            <Autocomplete
              disablePortal
              options={studios}
              getOptionLabel={(option) => option.name}
              isOptionEqualToValue={(opt, val) => opt.id === val.id}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="From" />}
              value={
                studios.find(
                  (item) => String(item.id) === String(fields.fromId),
                ) || null
              }
              onChange={(_e, newValue) =>
                onChange({ value: newValue?.id?.toString(), field: 'fromId' })
              }
            />
            <Autocomplete
              disablePortal
              options={studios}
              getOptionLabel={(option) => option.name}
              isOptionEqualToValue={(opt, val) => opt.id === val.id}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="To" />}
              onChange={(_e, newValue) =>
                onChange({ value: newValue?.id?.toString(), field: 'toId' })
              }
            />
            <LoadingButton
              onClick={onSubmit}
              disabled={!fields.movieId || !fields.fromId || !fields.toId}
              variant="contained"
              loading={loading}
            >
              Submit
            </LoadingButton>
          </Box>
        )}
        <Snackbar
          open={toast.open}
          autoHideDuration={5000}
          onClose={closeToast}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert
            elevation={6}
            variant="filled"
            onClose={closeToast}
            severity={toast.severity}
            sx={{ width: '100%' }}
          >
            {toast.message}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default SellMovie;

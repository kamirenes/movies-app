import { Box, TextField, Typography } from '@material-ui/core';
import Header from '../../common/components/Header/Header';
import useLoginPage from './useLoginPage';
import { authStyles } from './styles';
import { LoadingButton } from '@mui/lab';

const Login = () => {
  const { credentials, loading, onChange, onSubmit } = useLoginPage();

  const styles = authStyles();

  return (
    <div>
      <Header currentTab={3} />
      <div className={styles.pageContainer}>
        <Typography variant="h4" component="h2" className={styles.title}>
          Log-in
        </Typography>

        <Box className={styles.container}>
          <TextField
            id="auth-user"
            label="Email"
            variant="outlined"
            value={credentials.email ?? ''}
            onChange={(e) => onChange(e.target.value, 'email')}
            className={styles.field}
          />

          <TextField
            id="auth-password"
            label="Password"
            variant="outlined"
            value={credentials.password ?? ''}
            onChange={(e) => onChange(e.target.value, 'password')}
            type="password"
            className={styles.field}
          />

          <LoadingButton
            onClick={onSubmit}
            disabled={!credentials.password || !credentials.email}
            variant="contained"
            loading={loading}
          >
            Submit
          </LoadingButton>
        </Box>
      </div>
    </div>
  );
};

export default Login;

import {
  Avatar,
  Card,
  CircularProgress,
  Grid,
  Typography,
} from '@material-ui/core';
import useImageFeaturePage from './useImageFeaturePage';
import { Movie, Studio } from './types';
import { useAppStyles } from './styles';
import FiltersSection from './components/FiltersSection/FiltersSection';
import Header from '../../common/components/Header/Header';

function ImagesFeature() {
  const {
    formattedMovies,
    loading,
    studios,
    genreCode,
  } = useImageFeaturePage();

  const styles = useAppStyles();

  return (
    <div>
      <Header drawerChild={<FiltersSection />} currentTab={0} />
      <div className={styles.pageContainer}>
        {loading ? (
          <CircularProgress />
        ) : (
          <Grid
            container
            alignItems="center"
            spacing={2}
            className={styles.container}
          >
            {formattedMovies.map((movie: Movie) => (
              <Grid key={`${movie.id}`} item xs={12} sm={6} lg={4}>
                <Card className={styles.card}>
                  <Avatar
                    alt={movie.name}
                    src={movie.img}
                    className={styles.avatar}
                  />
                  <div>
                    <Typography>
                      {movie.name + ' '}
                      <Typography
                        component="span"
                        style={{ fontWeight: 'bold', display: 'inline-block' }}
                      >
                        {genreCode(movie.genre) ?? ''}
                      </Typography>
                    </Typography>
                  </div>
                  <Typography>
                    {
                      studios.find(
                        (studio: Studio) => studio.id === movie.studioId,
                      )?.name
                    }
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </div>
    </div>
  );
}

export default ImagesFeature;

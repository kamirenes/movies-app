import { Avatar, Card, Grid, Typography } from "@material-ui/core";
import usePage from "./usePage";
import { TMovie, TStudio } from "./types";
import { defaultAvatar } from "../../constants/constants";
import { useAppStyles } from "./styles";

function ImagesFeature() {
  const {
    avatarSize,
    cardStyle,
    formattedMovies,
    studios
  } = usePage();

  const styles = useAppStyles();

  return (
    <div className="App">
      <div className="App-studios App-flex">
        <h3>Images:</h3>
        <Grid container justify="center" alignItems="center" spacing={2}>
          {formattedMovies.map((movie: TMovie) => (
            <Grid key={`${movie.id}`} item xs={12} sm={6} lg={4}>
              <Card className={styles[cardStyle]}>
                <Avatar
                  alt={movie.name}
                  src={ movie.img}
                  style={{ margin: 5, width: avatarSize, height: avatarSize }}
                />
                <div>
                  <Typography>
                    {movie.name + " "}
                    <Typography
                      component="span"
                      style={{ fontWeight: "bold", display: "inline-block" }}
                    >
                      {movie.position}
                    </Typography>
                  </Typography>
                </div>
                <Typography>
                  {studios.find((studio: TStudio) => studio.id === movie.studioId)?.name}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}

export default ImagesFeature;

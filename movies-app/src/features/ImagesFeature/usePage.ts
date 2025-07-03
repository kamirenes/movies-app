import { useCallback, useEffect, useMemo, useState } from "react";
import { Config } from "../../config/config";
import { CardStyleEnum, TCardStyle, TMovie, TStudio } from "./types";
import { defaultAvatar } from "../../constants/constants";

export default () => {
  const [studios, setStudios] = useState<TStudio[]>([]);
  const [movies, setMovies] = useState<TMovie[]>([]);
  const [formattedMovies, setFormattedMovies] = useState<TMovie[]>([]);
  const [avatarSize, setAvatarSize] = useState(280);
  const [cardStyle, setCardStyle] = useState<TCardStyle>(CardStyleEnum.REGULAR);

  const domain = Config.REACT_APP_SERVER_BASE_URL;

  const responsiveStyle = useCallback(() => {
    setAvatarSize(window.innerWidth < 601 ? 60 : 280);
    setCardStyle(
      window.innerWidth < 601 ? CardStyleEnum.SMALL : CardStyleEnum.REGULAR
    );
  }, []);

  useEffect(() => {
    window.addEventListener("resize", responsiveStyle);
    responsiveStyle();

    fetch(`${domain}/studios`)
      .then((res) => res.json())
      .then(setStudios)
      .catch((err) => console.error("Error loading studios:", err));

    fetch(`${domain}/movies`)
      .then((res) => res.json())
      .then(setMovies)
      .catch((err) => console.error("Error loading movies:", err));

    return () => window.removeEventListener("resize", responsiveStyle);
  }, [responsiveStyle, domain]);

  useEffect(() => {
    const validateImage = (url?: string): Promise<boolean> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = url ?? "";
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
      });
    };

    const formatMovies = async () => {
      const results = await Promise.all(
        movies.map(async (movie) => {
          const isValid = await validateImage(movie?.img);

          const needsProxy = movie?.img?.includes("static.wikia.nocookie.net") || movie?.img?.includes("lainformacion.com");

          const finalImage =
            isValid && movie.img
              ? needsProxy
                ? `https://images.weserv.nl/?url=${encodeURIComponent(
                    movie.img.replace(/^https?:\/\//, "")
                  )}`
                : movie.img
              : defaultAvatar;

          return {
            ...movie,
            img: finalImage,
          };
        })
      );
      setFormattedMovies(results);
    };

    if (movies.length > 0) {
      formatMovies();
    }
  }, [movies]);

  return {
    avatarSize,
    cardStyle,
    formattedMovies,
    studios,
  };
};

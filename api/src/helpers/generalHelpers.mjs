import { GENRE_STRING } from "../../constants/studio_constants.mjs";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const DB_PATH = path.join(__dirname, "../../", "constants", "db.json");

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

export const getMovie = (movieId, studios) => {
  let movie;
  let studio = studios.find((t) => {
    movie = t.movies.find((p) => p.id === movieId);
    return movie;
  });
  if (movie && studio) {
    return { movie, studioId: studio.id };
  }

  return false;
};

export const getAllMoviesFromStudios = (studios) => {
  let allMovies = [];
  studios.forEach((singleStudio) => {
    singleStudio.movies.map((movie) => {
      allMovies.push(movieConstructor(movie, singleStudio));
    });
  });
  return allMovies;
};

export const movieConstructor = (movie, studio) => {
  if (movie.url) {
    Object.defineProperty(
      movie,
      "img",
      Object.getOwnPropertyDescriptor(movie, "url")
    );
    delete movie["url"];
  } else if (typeof movie.position === "number") {
    movie["position"] = GENRE_STRING[movie.price];
  }
  Object.defineProperty(
    movie,
    "studioId",
    Object.getOwnPropertyDescriptor(studio, "id")
  );

  return movie;
};

/** Manage users */
export const getUsers = () => {
  const db = JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
  return db.users || [];
};

export const saveUsers = (users) => {
  const db = { users };
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), "utf-8");
};

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ status: 401, message: "Token missing or malformed" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    const db = JSON.parse(fs.readFileSync(DB_PATH));
    const user = db.users.find((u) => u.id === decoded.userId);

    if (!user)
      return res.status(404).json({ status: 404, message: "User not found" });

    req.user = user;
    next();
  } catch (err) {
    return res
      .status(403)
      .json({ status: 403, message: "Invalid or expired token" });
  }
};

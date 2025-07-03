import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {
  authMiddleware,
  getAllMoviesFromStudios,
  getUsers,
  saveUsers,
} from "./helpers/generalHelpers.mjs";
import {
  sony,
  warner,
  disney,
  movieAge,
  GENRE_DETAILS,
  studiosMap,
} from "../constants/studio_constants.mjs";
import { logInfo, logError } from "./helpers/logger.mjs";
import { sendSuccess, sendError } from "./helpers/responseHelpers.mjs";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/studios", (req, res) => {
  try {
    const studios = [disney, warner, sony].map(
      ({ movies, ...studioData }) => studioData
    );
    sendSuccess(res, studios);
    logInfo("Get studios successful", result);
  } catch (e) {
    logError("Unexpected error during get studios", e);
    sendError(res, { status: 500, message: "Internal server error" });
  }
});

app.get("/movies", function (req, res) {
  try {
    sendSuccess(res, getAllMoviesFromStudios([disney, warner, sony]));
    logInfo("Get movies successful", result);
  } catch (e) {
    logError("Unexpected error during get movies", e);
    sendError(res, { status: 500, message: "Internal server error" });
  }
});

app.get("/movieAge", function (req, res) {
  res.json(movieAge);
});

app.get("/genres", function (req, res) {
  try {
    const genres = Object.values(GENRE_DETAILS);
    logInfo("genres successful");
    sendSuccess(res, genres);
  } catch (e) {
    logError("Unexpected error during get genres", e);
    sendError(res, { status: 500, message: "Internal server error" });
  }
});

app.post("/transfer", authMiddleware, function (req, res) {
  try {
    const { movieId, fromId, toId } = req.body;
    logInfo("Transfer requested", { movieId, fromId, toId });

    if (!movieId || !fromId || !toId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const allStudios = studiosMap;
    const fromStudio = allStudios[fromId];
    const toStudio = allStudios[toId];

    if (!fromStudio || !toStudio) {
      return sendError(res, {
        status: 400,
        message: "The studio ID is not correct",
      });
    }

    if (fromId === toId) {
      return sendError(res, {
        status: 400,
        message: "The studios must be different",
      });
    }

    const movieIndex = fromStudio.movies.findIndex((m) => m.id === movieId);
    if (movieIndex === -1) {
      return sendError(res, {
        status: 400,
        message: "The movie was not found in the origin studio",
      });
    }

    const movie = fromStudio.movies[movieIndex];

    if (typeof movie.price !== "number" || movie.price <= 0) {
      return sendError(res, {
        status: 400,
        message: "The movie doesn't have a valid price",
      });
    }

    if (toStudio.money < movie.price) {
      return sendError(res, {
        status: 400,
        message: `${toStudio.name} doesn't have enough money to buy "${movie.name}"`,
      });
    }

    fromStudio.movies.splice(movieIndex, 1);
    toStudio.movies.push(movie);
    toStudio.money -= movie.price;
    fromStudio.money += movie.price;

    sendSuccess(res, {
      message: `Movie "${movie.name}" was transferred from ${fromStudio.shortName} to ${toStudio.shortName}`,
      fromStudioBalance: fromStudio.money,
      toStudioBalance: toStudio.money,
    });

    logInfo("Transfer successful", result);
  } catch (error) {
    logError("Transfer failed", error);
    sendError(res, { status: 500, message: "Internal server error" });
  }
});

/** Manage user */
app.post("/login", (req, res) => {
  try {
    const { email, password } = req.body;
    logInfo("Login attempt", { email });

    const users = getUsers();
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      logInfo("Login failed - invalid credentials", { email });
      return sendError(res, { status: 401, message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id, name: user.name }, SECRET_KEY, {
      expiresIn: "1h",
    });

    user.token = token;
    saveUsers(users);

    const { password: _, ...userWithoutPassword } = user;
    logInfo("Login successful", { userId: user.id });
    sendSuccess(res, { user: userWithoutPassword });
  } catch (error) {
    logError("Unexpected error during login", error);
    sendError(res, { status: 500, message: "Internal server error" });
  }
});

app.get("/health", (req, res) => {
  const timestamp = new Date().toISOString();
  logInfo("Health-check OK", { timestamp });
  sendSuccess(res, { status: "ok", timestamp });
});

app.listen(3000);

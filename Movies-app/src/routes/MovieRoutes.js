import express from "express";
import { getMovie, getAllMovies, getMovieByDate, getMovieSchedule } from "../controller/MoviesController.js";
import { createShowtimes, deleteSchedule, getShowtimeDate, getShowtime } from "../controller/ShowtimesController.js";
import { verifyToken } from "../Middleware/authJwt.js";
import { createTransactions, cancelTransactions, transactionHistory } from "../controller/TransactionsController.js";

const router = express.Router();

router.get("/movies", getAllMovies);
router.get("/movies/:id", getMovie);
router.get("/movies/date/show/:id", getMovieByDate);
router.get("/movies/date/:id", getMovieSchedule);
router.post("/jadwal/:id", getShowtimeDate);
router.get("/booking/date/:id", getShowtime);
router.post("/schedule", createShowtimes);
router.delete("/schedule/:id", deleteSchedule);
// router.post('/movies/date/booking/:id', createTransactions)
router.post("/movies/date/booking", [verifyToken], createTransactions);
export default router;

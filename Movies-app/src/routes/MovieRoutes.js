import express from "express";
import {getMovie, getAllMovies, getMovieByDate, getMovieSchedule } from "../controller/MoviesController.js";
import { createShowtimes, deleteSchedule } from "../controller/ShowtimesController.js";

const router = express.Router()

router.get('/movies/:id', getMovie)
router.get('/movies', getAllMovies)
router.get('/movies/date/show/:id', getMovieByDate)
router.get('/movies/date/:id', getMovieSchedule)
router.post('/schedule', createShowtimes)
router.delete('/schedule/:id', deleteSchedule)


export default router;

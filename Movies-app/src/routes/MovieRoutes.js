import express from "express";
import {getMovie, getAllMovies, getMovieByDate } from "../controller/MoviesController.js";

const router = express.Router()

router.get('/movies/:id', getMovie)
router.get('/movies', getAllMovies)
router.get('/movies/date/:id', getMovieByDate)

export default router;

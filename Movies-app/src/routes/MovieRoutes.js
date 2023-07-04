import express from "express";
import {getMovie, getAllMovies, getMovieByDate, getMovieSchedule } from "../controller/MoviesController.js";
import { createShowtimes, deleteSchedule } from "../controller/ShowtimesController.js";
import { registerUser, loginUser, allAccess, userAccess  } from "../controller/UserController.js";
import { verifyToken } from "../Middleware/authJwt.js";
import { createTransactions } from "../controller/TransactionsController.js";

const router = express.Router()

router.get('/movies/:id', getMovie)
// router.use("/user", [verifyToken], userAccess);
router.get('/movies', getAllMovies)
router.get('/movies/date/show/:id', getMovieByDate)
router.get('/movies/date/:id', getMovieSchedule)
router.post('/schedule', createShowtimes)
router.delete('/schedule/:id', deleteSchedule)
router.post('/register', registerUser);
router.post('/login', loginUser);
//router.use("/user", [verifyToken], userAccess);
// router.post('/movies/date/booking/:id', createTransactions)
router.post('/movies/date/booking',[verifyToken], createTransactions)
router.use("/all", allAccess);
router.use("/user", [verifyToken], userAccess);
//router.post
//app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);
  
//app.get(    "/api/test/mod", [authJwt.verifyToken, authJwt.isModerator], controller.moderatorBoard   );
//app.get("/api/test/admin",[authJwt.verifyToken, authJwt.isAdmin],controller.adminBoard);
export default router;

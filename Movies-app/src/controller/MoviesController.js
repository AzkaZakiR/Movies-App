import { PrismaClient } from "@prisma/client";
//import { Response } from "express";

const prisma = new PrismaClient();

export const getAllMovies = async (req, res) => {
  try {
    const movies = await prisma.movies.findMany();
    res.status(200).json({ response: movies });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getMovie = async (req, res) => {
  try {
    const movieId = req.params.id;
    const movies = await prisma.movies.findUniqueOrThrow({
      where: {
        id: Number(movieId),
      },
    });
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

export const getMovieSchedule = async (req, res) => {
  try {
    const movieId = req.params.id;
    const schedule = await prisma.showtimes.findMany({
      where: {
        movieId: Number(movieId),
      },
    });
    res.status(200).json({ response: schedule });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

export const getMovieByDate = async (req, res) => {
  try {
    const movieId = req.params.id;
    const movies = await prisma.movies.findUniqueOrThrow({
      where: {
        id: Number(movieId),
      },
    });
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

// module.exports = {
//     getAllMovies,
//     getMovie,
//     getMovieByDate
// }

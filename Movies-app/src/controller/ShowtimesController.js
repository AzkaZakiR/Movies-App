import { PrismaClient } from "@prisma/client";
import {v4 as uuidv4} from "uuid";
// import {seatsObject} from "./Seats.js";
import seatsObject from "./Seats.js";
//import { Response } from "express";

const prisma = new PrismaClient();

export const getMovie = async(req, res) => {
    try {
        const movieId = req.params.id;
        const movies = await prisma.movies.findUniqueOrThrow({
            where: {
                id: Number(movieId)
            }
        });
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({msg:error})
    }
} 

export const createShowtimes = async(req, res) => {
    console.log(req.body);
    const {date,  studios, movieId, startAt} = req.body;
    const tanggal = date.substring(0, 10);
    const id = `sht-${tanggal}-${uuidv4().split('-')[0]}`;
    try {
        const schedule = await prisma.showtimes.create({
            data: {
                id: id,
                date: date,
                seats: seatsObject,
                studios: studios,
                movieId: movieId,
                startAt: startAt
            },
        }) 
        res.status(201).json(schedule);
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}


export const deleteSchedule = async(req, res) => {
    try{
        const schedule = await prisma.showtimes.delete({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json(schedule)
    } catch(err){
        res.status(400).json({msg: err.message});
    }
}

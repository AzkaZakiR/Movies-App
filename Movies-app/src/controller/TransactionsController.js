import {PrismaClient} from "@prisma/client";
import {v4 as uuidv4} from "uuid";

const prisma = new PrismaClient();

export const createTransactions = async(req, res) => {

    const userId = req.userId;
    const {totalcost, bookedseat, showTimeId } = req.body;
    let trscCode = `trsc-${uuidv4().split('-')[0]}`;
    const currentDate = new Date().toISOString().split('T')[0];
    let status = "pending";
    let count = 0;
    for (const seat in bookedseat) {
        if (bookedseat[seat] === true) {
        count++;} 
    }
    if(count > 6){
        return res.status(400).json({ error: 'Maximum limit of 6 seats exceeded' });
    }
    let seatString = JSON.stringify(bookedseat);
    console.log("Number of booksed seats:" + count + bookedseat)
    const user = { connect: { id: userId,},};
    const showtime = {connect: { id: showTimeId }}
    const schedule = await prisma.showtimes.findUnique({
        where: {id: showTimeId,},});
    const kursibuking = {
            ...schedule.seats, // Existing seats data from the showtime record
            ...bookedseat, // User's selected seats
          };
    try{
        const transaction = await prisma.transactions.create({
            data:{
                transactionCode: trscCode,
                totalcost: totalcost,
                booked_seat: seatString,
                status: status,
                user,
                showtime
            }, 
        })
        const updateSeats = await prisma.showtimes.update({
            where: {
                id: showTimeId
            }, data:{
                seats: kursibuking
            }
        })
    res.status(201).json(transaction);
    } catch(error){
        res.status(400).json({msg: error.message});
        console.log(error);
    }
}

export const cancelTransactions = async(req, res) => {
    const userId = req.userId;
    const transactionId = parseInt(req.params.id) ;

    try {
        const cancelTransactions = await prisma.transactions.update({
            where: {
                id: transactionId,
            }, data:{
                status: "canceled"
            }
        })
        res.status(200).json(cancelTransactions)
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

export const transactionHistory = async(req, res) => {
    const userId = req.userId;
    
    try {
        const history = await prisma.transactions.findMany({
            where: {
                userId: userId
            }
        })
        res.status(200).json(history)
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

// export const createTransactions = async(req, res) => {
//     res.status(200).send("API JALAN")
// }
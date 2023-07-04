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
    const user = {
        connect: { id: userId,},};
    const showtime = {
        connect: { id: showTimeId }}
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
    res.status(201).json(transaction);
    } catch(error){
        res.status(400).json({msg: error.message});
        console.log(error);
    }
}

// export const createTransactions = async(req, res) => {
//     res.status(200).send("API JALAN")
// }
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

export const createTransactions = async (req, res) => {
  const userId = req.userId;
  const { bookedseat, showTimeId } = req.body;
  let trscCode = `trsc-${uuidv4().split("-")[0]}`;
  let status = "pending";
  let count = 0;
  let showTime = await prisma.showtimes.findUnique({
    where: {
      id: showTimeId,
    },
  });
  let findPrice = await prisma.movies.findFirst({
    where: {
      id: showTime.movieId,
    },
  });

  for (const seat in bookedseat) {
    if (bookedseat[seat] === true) {
      count++;
    }
  }
  let totalPrice = count * findPrice.price;
  if (count > 6) {
    return res.status(400).json({ error: "Maximum limit of 6 seats exceeded" });
  }
  let seatString = JSON.stringify(bookedseat);
  console.log("Number of totalPrice:" + totalPrice);
  const user = { connect: { id: userId } };
  const showtime = { connect: { id: showTimeId } };
  const schedule = await prisma.showtimes.findUnique({
    where: { id: showTimeId },
  });
  const kursibuking = {
    ...schedule.seats, // Existing seats data from the showtime record
    ...bookedseat, // User's selected seats
  };
  try {
    const transaction = await prisma.transactions.create({
      data: {
        transactionCode: trscCode,
        totalcost: totalPrice,
        booked_seat: seatString,
        status: status,
        user,
        showtime,
      },
    });
    const updateSeats = await prisma.showtimes.update({
      where: {
        id: showTimeId,
      },
      data: {
        seats: kursibuking,
      },
    });
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ msg: error.message });
    console.log(error);
  }
};

export const confirmTransactions = async (req, res) => {
  const userId = req.userId;
  const transactionId = req.params.id;
  let ticketCode = `tckt-${uuidv4().split("-")[0]}`;
  try {
    let seats = await prisma.transactions.findUnique({ where: { id: parseInt(transactionId) } });
    console.log(seats);
    let kursi = JSON.parse(seats.booked_seat);
    let count = Object.keys(kursi).length;
    console.log("Hasil kursi" + kursi);
    console.log("Hasil count" + count);

    const user = { connect: { id: userId } };
    const transaction = { connect: { id: parseInt(transactionId) } };

    const confirmTransactions = await prisma.transactions.update({
      where: {
        id: parseInt(transactionId),
      },
      data: {
        status: "success",
      },
    });

    const createTicket = await prisma.ticket.create({
      data: {
        ticketCode: ticketCode,
        seat: count,
        transactions: transaction,
        users: user,
      },
    });
    res.status(200).json(confirmTransactions);
  } catch (error) {
    res.status(400).json({ msg: error.message });
    console.log(error);
  }
};

export const cancelTransactions = async (req, res) => {
  const userId = req.userId;
  const transactionId = parseInt(req.params.id);

  try {
    const cancelTransactions = await prisma.transactions.update({
      where: {
        id: transactionId,
      },
      data: {
        status: "canceled",
      },
    });
    res.status(200).json(cancelTransactions);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const transactionHistory = async (req, res) => {
  const userId = req.userId;
  let filmId = [];
  let showId = [];
  let moviePoster = [];
  let movieTitle = [];
  try {
    console.log("User ID" + userId);

    const history = await prisma.transactions.findMany({
      where: {
        userId: userId,
      },
    });

    for (let i = 0; i < history.length; i++) {
      showId.push(history[i].showTimeId);
    }
    // console.log("Show Id" + showId);
    for (let x = 0; x < showId.length; x++) {
      const findId = await prisma.showtimes.findUnique({
        where: {
          id: showId[x],
        },
      });

      filmId.push(findId.movieId);
    }
    console.log(filmId);
    for (let i = 0; i < filmId.length; i++) {
      const image = await prisma.movies.findUnique({
        where: {
          id: filmId[i],
        },
      });
      moviePoster.push(image.poster);
      movieTitle.push(image.title);
    }
    //console.log("Poster" + moviePoster);
    console.log(moviePoster[1]);
    for (let i = 0; i < history.length; i++) {
      history[i].poster = moviePoster[i];
    }
    for (let i = 0; i < history.length; i++) {
      history[i].title = movieTitle[i];
    }
    console.log(history);
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ msg: error });
    console.log(error);
  }
};

// export const createTransactions = async(req, res) => {
//     res.status(200).send("API JALAN")
// }

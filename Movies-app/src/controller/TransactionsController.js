import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import puppeteer from 'puppeteer';

const prisma = new PrismaClient();

export const createTransactions = async (req, res) => {
  const userId = req.userId;
  const { bookedseat, showTimeId } = req.body;
  let trscCode = `trsc-${uuidv4().split("-")[0]}`;
  let status = "pending";
  let count = 0;
  let showTime = await prisma.showtimes.findUnique({
    where: {
      //find showtimes with the given Id
      id: showTimeId,
    },
  });
  let findPrice = await prisma.movies.findFirst({
    where: {
      //find the selected movies with the showtimes given Id
      id: showTime.movieId,
    },
  });

  for (const seat in bookedseat) {
    if (bookedseat[seat] === true) {
      count++;
    }
  }
  if (count > 6) {
    return res.status(400).json({ error: "Maximum limit of 6 seats exceeded" }); //check if the seats exceeded 6
  }
  let totalPrice = count * findPrice.price;

  let seatString = JSON.stringify(bookedseat);
  console.log("Number of totalPrice: " + totalPrice);
  const user = { connect: { id: userId } };
  const showtime = { connect: { id: showTimeId } };
  const kursibuking = {
    ...showTime.seats, // Existing seats data from the showtime record
    ...bookedseat, // User's selected seats
  };
  const pengguna = await prisma.users.findUnique({ where: { id: userId } }); //find the user to check the balance

  if (pengguna.balance < totalPrice) {
    return res.status(400).json({ msg: "Insufficient balance." });
  }
  console.log(pengguna);
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
    let transactionData = await prisma.transactions.findUnique({ where: { id: parseInt(transactionId) } });
    console.log(transactionData);
    let kursi = JSON.parse(transactionData.booked_seat);
    let count = Object.keys(kursi).length;
    let totalcost = transactionData.totalcost;

    console.log("Total cost" + totalcost);
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

    const moviePrice = await prisma.users.update({
      where: {
        id: userId,
      },
      data: {
        balance: {
          decrement: totalcost,
        },
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
  const idofUser = req.userId;
  const transactionId = parseInt(req.params.id);

  const checkTransactionId = await prisma.transactions.findUnique({
    where: {
      id: transactionId,
    },
  });
  const checkUsers = await prisma.users.findUnique({
    where: {
      id: checkTransactionId.userId,
    },
  });
  const checkShowtime = await prisma.showtimes.findUnique({
    where:{
      id: checkTransactionId.showTimeId,
    }
  })

  let updatedSeats = JSON.parse(checkTransactionId.booked_seat); 
  Object.keys(updatedSeats).forEach((key) => {
    updatedSeats[key] = false;
  }); 

  const newSeats = {
    ...checkShowtime.seats,
    ...updatedSeats,
  }
  if (idofUser !== checkUsers.id) {
    return res.status(401).send({
      message: "Unauthorized!!",
    });
  }

  try {
    const cancelTransactions = await prisma.transactions.update({
      where: {
        id: transactionId,
      },
      data: {
        status: "canceled",
      },
    });
    const updateSeats = await prisma.showtimes.update({
      where:{
        id: checkTransactionId.showTimeId
      },
      data:{
        seats: newSeats
      }
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
  let showDate = [];
  let showHour = [];
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
      showDate.push(findId.date);
      showHour.push(findId.startAt);
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
      history[i].date = showDate[i];
      history[i].startAt = showHour[i];
    }
    console.log(history);
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ msg: error });
    console.log(error);
  }
};

export const downloadTicket = async (req, res) => {
  const currentFileUrl = import.meta.url;
  const currentFilePath = fileURLToPath(currentFileUrl);
  const currentDir = dirname(currentFilePath);

  const filePath = path.join(currentDir, 'download', 'index.css');
  const fileName = 'index.css';
  console.log(currentDir, "curreft file", currentFileUrl, "current file path" ,currentFilePath);

  res.download(filePath, fileName, (err) => {
    if (err) {
      // Handle error, misalnya file tidak ditemukan atau masalah lainnya
      res.status(404).send('File not found');
    } else {
      console.log('File downloaded successfully');
    }
  });
}

export const generatePdf = async (req, res) => {
  const userId = req.userId;
  let transactionId = req.params.id;
  transactionId = parseInt(req.params.id, 10); // Convert the string to an integer

  try {
    const transactionData = await prisma.transactions.findUnique({
      where: {
        id: transactionId,
      }
    })
    const showtimeData = await prisma.showtimes.findUnique({
      where: {
        id: transactionData.showTimeId,
      }
    })
    const movieData = await prisma.movies.findUnique({
      where: {
        id: showtimeData.movieId,
      }
    })
    
  if (!transactionData) {
    // Handle the case where the transaction is not found
    return res.status(404).json({ error: 'Transaction not found' });
  }
    const ticketData = await prisma.ticket.findMany({
      where: {
        transactionsId: transactionData.id,
      }
    })
    console.log("transaction daat", transactionData);
    console.log("ticket data", ticketData);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    const totalCostFormatted = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(transactionData.totalcost);
    const bookedSeatsObject = JSON.parse(transactionData.booked_seat);
    const bookedSeats = Object.keys(bookedSeatsObject);
    // Set the HTML content to be converted to PDF
    const htmlContent = `
    <html>
    <head>
      <title>Generated Ticket</title>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          background-color: #f0f0f0;
          margin: 0;
          padding: 20px;
          text-align: center;
        }
  
        h1 {
          margin-bottom: 10px;
          color: #333;
        }
  
        .ticket {
          background-color: #fff;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          display: inline-block;
        }
  
        .ticket-info {
          margin-top: 20px;
        }
  
        .total-cost {
          color: #e44d26; /* Orange color for emphasis */
        }
  
        .movie-title {
          color: #007acc; /* Blue color for emphasis */
        }
  
        .booked-seats {
          font-weight: bold;
        }
  
        .ticket-code {
          color: #555;
        }
      </style>
    </head>
    <body>
      <div class="ticket">
        <h1>Hello, this is your ticket!</h1>
        <div class="ticket-info">
          <p class="total-cost">Total: ${totalCostFormatted}</p>
          <p class="movie-title">Movie: ${movieData.title}</p>
          <p class="booked-seats">Seats: ${bookedSeats.join(', ')}</p>
          <p class="ticket-code">Ticket Code: ${ticketData[0].ticketCode}</p>
        </div>
      </div>
    </body>
  </html>
    `;
  
    // Set the HTML content on the Puppeteer page
    await page.setContent(htmlContent);
  
    // Generate PDF
    const pdfBuffer = await page.pdf();
  
    // Close the Puppeteer browser
    await browser.close();
    const filename = `${ticketData[0].ticketCode}.pdf`;

    // Send the generated PDF as a response
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition',  `attachment; filename=${filename}`);
    res.send(pdfBuffer);   
  } catch (error) {
    res.status(500).json({ msg: error });
    console.log(error);
  }
 
}
// export const createTransactions = async(req, res) => {
//     res.status(200).send("API JALAN")
// }

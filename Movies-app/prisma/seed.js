import { movies } from "./moviedata.js";
import { PrismaClient } from "@prisma/client";
// import { showTimesdata } from "./showtime.js";
import { v4 as uuidv4 } from "uuid";
import seatsObject from "./Seats.js";

const prisma = new PrismaClient();

// {
//     id: "1",
//     date: "2023-06-15",
//     seats: {
//       seatsObject,
//     },
//     studios: 1,
//     startAt: "16:00",
//     movieId: 1,
//   },
// const id = `sht-${date[i]}-${uuidv4().split("-")[0]}`;

const date = ["2023-06-15", "2023-06-16", "2023-06-17", "2023-06-18", "2023-06-19", "2023-06-20", "2023-06-21"];
const hours = ["10:00", "12:00", "14:00", "16:00", "18:00"];
async function main() {
  for (let movie of movies) {
    await prisma.movies.create({
      data: movie,
    });
    for (let i = 0; i < date.length; i++) {
      for (let j = 0; j < hours.length; j++) {
        await prisma.showtimes.create({
          data: {
            id: `sht-${date[i]}-${uuidv4().split("-")[0]}`,
            date: date[i],
            seats: seatsObject,
            studios: 1,
            startAt: hours[j],
            movieId: movie.id,
          },
        });
      }
    }
  }
  //   for (let show of showTimesdata) {
  //     await prisma.showtimes.create({
  //       data: show,
  //     });
  //   }
}

// async function main() {
//     for (let show of showTimes) {
//       await prisma.showtimes.create({
//         data: show
//       });
//     }
//   }

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect;
  });

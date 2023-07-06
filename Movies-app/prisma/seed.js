import {movies} from  './data.js';
import { PrismaClient} from "@prisma/client";
import { showTimesdata } from './showtime.js';

const prisma = new PrismaClient();

async function main(){
    for (let movie of movies) {
        await prisma.movies.create({
            data: movie})}
    for (let show of showTimesdata) {
        await prisma.showtimes.create({
            data: show 
        });
    }
        }


async function utama(){
        for (let show of showTimesdata) {
            await prisma.showtimes.create({
                data: show 
            });
        }
    }

// async function main() {
//     for (let show of showTimes) {
//       await prisma.showtimes.create({
//         data: show
//       });
//     }
//   }

main().catch(e => {
    console.log(e);
    process.exit(1)
}).finally(() => {
    prisma.$disconnect
})
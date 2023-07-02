import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import MoviesRoutes from "./routes/MovieRoutes.js"
import { logRequest } from "./Middleware/log.js";

dotenv.config()

const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logRequest);
app.use(MoviesRoutes)
const PORT = 4000
// app.get('/api', (req, res) => {
//     res.send("Api is working");})

const start = async () => {
    try{
        app.listen(PORT, console.log(`Server listening on port ${PORT}...`));
    } catch(err){
        console.log(err)
    }
}

start()
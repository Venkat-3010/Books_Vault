import express from "express";
import cors from "cors"
import { PORT, uri } from "./config.js";
import mongoose from "mongoose";
import router from "./routes/bookroute.js";

const app = express();
app.use(express.json());
app.use(cors());
app.get("/", (req,res) => {
    res.send("Hello")
})

app.listen(PORT, () => {
    console.log(`server is up and running @ ${PORT}`);
})

app.use('/books', router);

mongoose.connect(uri).then(() =>{
    console.log("successfully connected to database");
}).catch((error) => {
    console.log(error);
})
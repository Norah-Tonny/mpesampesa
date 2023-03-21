const express = require("express");
const app = express();
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const port = process.env.PORT || 5000
const mpesaRoutes = require("./routes/mpesa")

dotenv.config()

const cors=require("cors")

 
mongoose.connect(process.env.MONG0_URL)
    .then(() => {
        app.listen(port, () => {
            console.log(`Application is running on port ${port} and DB is connected`)
        })
    })
    .catch((err) => {
        console.log(err)
    })
app.use(express.json())


const corsOptions={
    origin:"*"
    
    }
app.use("/api", mpesaRoutes);
app.use(cors(corsOptions))






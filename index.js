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
origin: "*"
    
    }
app.use("/api", mpesaRoutes);
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});



app.use(cors(corsOptions))






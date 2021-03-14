const express =require("express");
const env = require("dotenv");
const app = express();
const mongoose = require("mongoose"); 
const userRoutes = require("./routes/user");
const cors = require("cors");

env.config();


mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASS}@cluster0.oemp0.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`, 
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true
    }).then(() => {
        console.log('database connected');
    }).catch(() =>{
        console.log("connection failed")
    })

app.use(cors());
app.use(express.json());
app.use('/api', userRoutes)



app.listen(process.env.PORT, () =>{
    console.log("server is up")
});



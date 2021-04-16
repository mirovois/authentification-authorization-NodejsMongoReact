const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const userRouter = require('./routes/userRouter')
require('dotenv').config()

// Setting up server

const app = express();
app.use(express.json());
app.use(cors());

// app.get('/',(req, res) =>{
//     res.send('API is running...')
// })
// set up mongoose

const MONGODB_CONNECTION_STRING = 'mongodb+srv://miro:miro123@cluster0.ldxdq.mongodb.net/auth?retryWrites=true&w=majority'
mongoose.connect(
    MONGODB_CONNECTION_STRING,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    },
    (err) => {
      if (err) throw err;
      console.log("MongoDB connection established");
    }
  );
  
// set up routes

app.use("/users", userRouter);  
// app.use("/", userRouter);  


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`The server has started on port: ${PORT}`));
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const userRouter = require('./routes/userRouter')
require('dotenv').config()

// Setting up server

const app = express();
app.use(express.json());
app.use(cors());
// const __dirname = path.resolve()
// set up mongoose
if(process.env.NODE_ENV ==='production'){
  app.use(express.static(path.join(__dirname, '../frontend/build')))
  app.get('*', (req, res)=>{
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  })
} else {
  app.get('/',(req, res) =>{
      res.send('API is running...')
  })
}

mongoose.connect(
    process.env.MONGODB_CONNECTION_STRING,
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

app.listen(PORT, () => console.log(`The app is running in ${process.env.NODE_ENV} MODE on port: ${PORT}`));
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require("body-parser");

const UserRoute =require('./routes/user');
const app = express();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//
mongoose.connect('mongodb+srv://rahuludhayakumar817:mine987@cluster1.1owvseo.mongodb.net/transaction', 
    {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB Atlas:', err);
  });





const PORT = process.env.PORT || 3000
app.listen(PORT, () => {  console.log(`Server is running on port ${PORT}`)});

app.use('/api/user',UserRoute)

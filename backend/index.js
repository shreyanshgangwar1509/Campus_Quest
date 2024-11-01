const  cors = require('cors') 
// import express from 'express';
const express = require('express');
const { default: connectDB } = require('./db/dbconnect');
connectDB();
const app = express();


app.use(cors()); 
app.use(express.json());


app.listen(3000, () => {
    console.log('Server is running on port 3000');
    
})
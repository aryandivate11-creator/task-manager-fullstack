require('dotenv').config();

const express = require('express');

const app =  express();

app.use(express.json());

app.get('/',(req,res) =>{
    res.send('<h1>Hello TechStalwarts</h1');
})

app.listen(process.env.PORT,() =>{
    console.log(`Server running on http://localhost:${process.env.PORT}`);
})
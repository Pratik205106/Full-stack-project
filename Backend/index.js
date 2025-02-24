// const express = require('express');
// const cors = require('cors');
// const { Prisma } = require('./config/Prisma');
// const app = express();
// const port = 3000;
// const hash = bcrypt('hash');  
import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const app = express();
const port = 3000;
const Prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get("/user", (req, res) => {
  res.json({
    id: 1,
  })
})

app.post('/user', async (req, res)=> {
    console.log(req.body)
    const { email, password } = req.body;

    //check if email exists//
    const checkEmail = await Prisma.user.findUnique(
{where: {email} });
if (checkEmail){
  return res.status(404).json({ 
    message: "Email already exists" 
  });
}

//Hash password//
const salt = await bcrypt.genSalt(10);
const hashpassword = await bcrypt.hash(password, salt);

//save user//
const saveData = await Prisma.user.create({
  data: {
    email: email,
    password: hashpassword,
  },
});


}) ;


// app.use(cors());
app.get('/', (req, res) => {
 res.json({message: "server is running"});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
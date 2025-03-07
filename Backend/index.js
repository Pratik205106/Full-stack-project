// // const express = require('express');
// // const cors = require('cors');
// // const { Prisma } = require('./config/Prisma');
// // const app = express();
// // const port = 3000;
 
// import express from "express";
// import cors from "cors";
// import { PrismaClient } from "@prisma/client";
// import bcrypt from "bcrypt";

// const app = express();
// const port = 3000;
// const Prisma = new PrismaClient();

// app.use(cors());
// app.use(express.json());

// app.get("/user", (req, res) => {
//   res.json({
//     id: 1,
//   })
// })

// app.post('/user', async (req, res)=> {
//   try{
//     console.log(req.body)
//     const { firstName, middleName, lastName, email, number, password, confirmPassword  } = req.body;

//     //check if email exists//
//     const checkEmail = await Prisma.user.findUnique(
// {where: {email} });
// if (checkEmail){
//   return res.status(400).json({ 
//     message: "Email already exists" 
//   });
// }

// //Hash password//
// const salt = await bcrypt.genSalt(10);
// const hashpassword = await bcrypt.hash(password, salt);

// //save user//
// const saveData = await Prisma.user.create({
//   data: {
//     email: email,
//     password: hashpassword,
//   },
// });
// res.status(201).json({ message: "User created successfully", user: saveData });
// } catch (error) {
//   console.error("Error:", error);
//   res.status(500).json({ message: "Internal Server Error" });
// }

// }) ;


// // app.use(cors());
// app.get('/', (req, res) => {
//  res.json({message: "server is running"});
// });

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// });

import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Prisma } from './config/Prisma.js';


const app = express();
app.use(cors());
app.use(express.json());

app.get('/user', (req, res)=>{
  res.json({
    id: 1,
    name: 'Pratik gaire',
    email: 'pratikgaire3@gmail.com'
  })
})

app.post('/user', async(req, res)=>{
  const {firstName, middleName, lastName, email, number, password} = req.body;

  const checkEmail = await Prisma.user.findUnique({where: {email} });
if(checkEmail){
  return res.status(404).json({
    Message: "Email already exists",
  });
}
const salt = await bcrypt.genSalt(10);
const hashpassword = await bcrypt.hash(password, salt);


const saveData = await Prisma.User.create({
  data: {
    firstName: firstName,
    middleName: middleName,
    lastName: lastName,
    email: email,
    number: number,
    password: hashpassword,
    confirmPassword:hashpassword,
  },
});

const token = jwt.sign(
  {
  id:saveData.id,
  email: saveData.email,
}, 
"pratik",
{
  expiresIn: "1h",
}
);
return res.status(200).json({
  Message: "User created successfully",
  data: saveData,
  token: token, 
});
});
app.listen(3000, ()=>{
  console.log('server is running on 3000')
})
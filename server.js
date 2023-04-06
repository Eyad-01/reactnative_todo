// const { PrismaClient } = require('@prisma/client');

// const prisma = new PrismaClient();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const mongodb = require('mongodb');
const app = express();
const cors = require('cors');
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
mongoose.connect("mongodb+srv://admin-Eyad:eyad2001@cluster0.2spvg.mongodb.net/UserDB",{useNewUrlParser:true, useUnifiedTopology: true });
const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    googleId:String,
    secret:String
});

const User = mongoose.model("User", userSchema);

// app.get("/TinDog/secrets",function (req,res) {
// User.find({"secret":{$ne:null}},function (err,foundUsers) {
//   if (err) {
//     console.log(err);
//   }else {
//     if (foundUsers) {
//       res.render("secrets",{usersWithSecrets:foundUsers});
//     }
//   }
// });
// });
//
// app.get("/submit",function (req,res) {
//   if(req.isAuthenticated()){
//     res.render("submit");
//   }else {
//     res.redirect("/login");
//   }
// });
// app.post("/submit",function (req,res) {
//   const submittedSecret=req.body.secret;
//
//   //console.log(req.user.id);
//   User.findById(req.user.id,function (err,foundUser) {
//     if(err){
//       console.log(err);
//     }else {
//       if(foundUser){
//         foundUser.secret=submittedSecret;
//         foundUser.save(function () {
//           res.redirect("/secrets");
//         });
//       }
//     }
//   });
// });

app.get('/todos', async (req, res) => {
  const allUsers = await User.find();
  res.json(allUsers);
});
//   try{
//   const todos = await prisma.User.findMany();
//   res.json(todos);
//   } catch (e) {
//     if (e.code === 'P2002') {
//       console.log(
//         'There is a unique constraint violation, a new user cannot be created with this email'
//       )
//     } else{
//     console.log(e)
//     }
//   // throw e
// }
// });

// app.post('/todos', async (req, res) => {
//   try{
//   const { title} = req.body;
//   const todo = await prisma.todo.create({
//     data: {
//       title
//     },
//   });
//   return res.json(todo);
//     } catch (e) {
//   if (e instanceof prisma.PrismaClientKnownRequestError) {
//     // The .code property can be accessed in a type-safe manner
//     if (e.code === 'P2002') {
//       console.log(
//         'There is a unique constraint violation, a new user cannot be created with this email'
//       )
//     }
//   }else{
//     console.log(e)
//   }
//   // throw e
// }
// });
//
// app.put('/todos/:id', async (req, res) => {
//   const { id } = req.params;
//   const { title, description } = req.body;
//   const todo = await prisma.todo.update({
//     where: { id },
//     data: {
//       title
//     },
//   });
//   res.json(todo);
// });
//
// app.delete('/todos/:id', async (req, res) => {
//   const { id } = req.params;
//   await prisma.todo.delete({ where: { id } });
//   res.json({ message: 'Todo deleted' });
// });

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require('cors');
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.get('/todos', async (req, res) => {
  try{
  const todos = await prisma.User.findMany();
  res.json(todos);
  } catch (e) {
  console.log(e)
  // throw e
}
});


app.post('/todos', async (req, res) => {
  try{
  const todo = await prisma.User.create({
    data: req.body,
  });
  res.json(todo);
    } catch (e) {
    console.log(e)
  // throw e
}
});
//
app.put('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { title} = req.body;
  const todo = await prisma.User.update({
    where: { id },
    data: {
      title
    },
  });
  res.json(todo);
});

app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.User.delete({ where: { id } });
  res.json({ message: 'Todo deleted' });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const todoRouter = require("./routes/todoRoutes");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/todo", todoRouter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("connect to db & listening Port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const blogRouter = require("./routes/blog-routes.js");
const router = require("./routes/user-routes.js");
const cors = require("cors");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", router);
app.use("/api/blog", blogRouter);

const PORT = process.env.PORT || 8000;

const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);


mongoose
  .connect("mongodb+srv://dck150303:123@cluster0.xrfumnk.mongodb.net/")
  .then(() => app.listen(PORT))
  .then(() =>
    console.log(`Connected To Database and listening at PORT ${PORT}`)
  )
  .catch((err) => console.log(err));


module.exports = server;


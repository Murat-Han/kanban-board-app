const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const taskRouter = require("./routes/taskRouter");

const app = express();
const PORT = 5000;

//set secret system environment variables when app starts
dotenv.config();

//converting requests and responses to json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, res) => {
    if (err) {
      return console.error("Error connecting to DB:", err);
    }
    console.log("Connected to DB successfully");
  }
);

//Using taskrouter for CRUD requests.
app.use(taskRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`);
});

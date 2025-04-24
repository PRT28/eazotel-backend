require("dotenv").config()

const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const cookieParser = require("cookie-parser")
const mongoose = require('mongoose')

const app = express();

app.use(cors({
  credentials: true,
  origin: true
}));
app.use(express.json());
app.use(helmet())
app.use(cookieParser())


const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("MongoDB connection successfull");
  app.listen(PORT, () => "Server successfully started on PORT:", PORT);
})


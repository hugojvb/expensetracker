const express = require("express");
const auth = require("./routes/auth.js");
const transactions = require("./routes/transactions.js");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

// dotenv config
dotenv.config({ path: "./config/config.env" });

// connect to database
connectDB();

// initiate express
const app = express();

// cors
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// use bodyParser & cookieParser
app.use(express.json());
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// routes
app.use("/api/auth", auth);
app.use("/api/transactions", transactions);

// listenning at port 5000
const server = app.listen(process.env.PORT, () => console.log("Server running at port: ", process.env.PORT));

// error handling
process.on("unhandledRejection", (err) => {
  console.log("Error: ", err.message);
  server.close(() => process.exit(1));
});

import express from "express";
import dotenv from "dotenv";
import cors from "cors";

//routes imports
import indexRoute from "./src/routes/index.js";

//middleware functions

//util functions
import { corsOptions } from "./src/config/corsConfig.js";
import { DbConnect } from "./src/config/DbConfig.js";
import cookieParser from "cookie-parser";

dotenv.config();

//app declaration
var app = express();

//global middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());
// routes declaration
app.use("/", (req, res) => {
  res.send("hellow there");
});
app.use("/api", indexRoute);

//dbConnection
app.listen(3001, () => {
  DbConnect(`${process.env.Mongo_Url}`);
});

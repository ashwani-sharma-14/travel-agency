"use strict";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
const DB = process.env.DB_URL;
mongoose
  .connect(DB,)
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.error("error while connecting to db:", err);
  });

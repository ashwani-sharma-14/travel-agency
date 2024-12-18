"use strict";
import express from "express";
import "./database/dataBaseConnection.js";
import dotenv from "dotenv";
const app = express();
import cors from "cors";
dotenv.config();
const port = process.env.PORT || 3000;
app.use(express.json());

import { packageRoute } from "./routes/packageRoute.js";
import { adminRoute } from "./routes/adminRoute.js";

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost4000",
    "http://localhost5000",
    "https://travel-agency-website-1.onrender.com"
  ],
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use("/", packageRoute);
app.use("/admin", adminRoute);
app.get("/", (req, res) => {
  res.json({ message: "home route" });
});

app.listen(port, () => {
  console.log(`server is listening to port:${port}`);
});

"use strict";
import mongoose from "mongoose";
import Booking from "./bookingModel.js";
const Schema = mongoose.Schema;

const packageSchema = new Schema({
  packageName: {
    type: String,
    required: true,
    unique: true,
  },
  description:{
    type: String,
    required: true,
  },
  picture: {
    type: Array,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  
  dates: [{
    type: Date,
    required: true,
  }],
  price: {
    type: Number,
    required: true,
  },
  booking:[{
    type: Schema.Types.ObjectId,
    ref: "Booking",
  }]
});

const Package = mongoose.model("Package", packageSchema);

export default Package;

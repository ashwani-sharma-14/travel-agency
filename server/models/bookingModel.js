"use strict";
import mongoose from "mongoose";
import Package from "./packageModel.js";
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    requires: true,
  },
  numberofTravelers: {
    type: Number,
    requires: true,
  },
  selectedDate: {
    type: Date,
    required: true,
  },
});

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;

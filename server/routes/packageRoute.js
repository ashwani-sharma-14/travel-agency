"use strict";
import express from "express"; //import express from express library
const router = express.Router();
import dotenv from "dotenv";
import Booking from "../models/bookingModel.js"; //import user model from model directory
import Package from "../models/packageModel.js";
import moment from "moment";
dotenv.config();

router.get("/packages", async (req, res) => {
  try {
    const packages = await Package.find();
    const pkgData = packages.map((pkg, index) => ({
      name: pkg.packageName,
      id: pkg._id,
      index: index,
      picture: pkg.picture,
      price: pkg.price,
      location: pkg.location,
      dates: pkg.dates,
    }));
    return res.status(200).json({ message: "data received", pkgData: pkgData });
  } catch (err) {
    console.error(err.message);
  }
});

router.get("/packages/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const packageDetail = await Package.findById(id);
    const pkgData = {
      name: packageDetail.packageName,
      id: packageDetail._id,
      picture: packageDetail.picture,
      price: packageDetail.price,
      location: packageDetail.location,
      dates: packageDetail.dates,
      description: packageDetail.description,
    };
    return res.status(200).json({ message: "data recieves", pkgData: pkgData });
  } catch (err) {
    console.error("error while viewing post", err);
    return res.status(401).json({ message: "bad request" });
  }
});

// router.get("/packages/:id/booking",async(req,res)=>{

// })

router.post("/packages/:id/booking", async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, numberofTravelers, selectedDate } = req.body;
  console.table({
    name: name,
    email: email,
    phone: phone,
    numberofTravelers: numberofTravelers,
    selectedDate,
  });
  try {
    const newDate = moment(selectedDate, "DD-MM-YYYY").toISOString();
    let packageDetail = await Package.findById(id);
    let booking = await Booking.findOne({ email: email });
    if (!booking) {
      booking = await Booking.create({
        name: name,
        email: email,
        phone: phone,
        numberofTravelers: numberofTravelers,
        selectedDate: newDate,
      });
      packageDetail.booking.push(booking);
      packageDetail.save();
      const totalPrice = req.body.numberofTravelers * packageDetail.price;
      return res.status(200).json({
        message: "booking registered",
        customer: {
          name: booking.name,
          email: email,
          phone: phone,
          date: selectedDate,
        },
        package: {
          name: packageDetail.packageName,
          price: packageDetail.price,
          description: packageDetail.description,
        },
        totalPrice: totalPrice,
      });
    } else {
      return res.status(200).json({ message: "booking exists" });
    }
  } catch (err) {
    console.error("error in new booking", err);
    return res.status(401).json({ message: "bad request" });
  }
});

export { router as packageRoute }; //function exported

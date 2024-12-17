"use strict";
import express from "express"; //import express from express library
import User from "../models/bookingModel.js"; //import user model from model directory
import bcrypt from "bcrypt"; //import bcrypt
import Package from "../models/packageModel.js";
import moment from "moment";
import Booking from "../models/bookingModel.js";
const router = express.Router(); //initializing router

router.get("/package", async (req, res) => {
  try {
    let packageDetail = await Package.find();
    return res.status(200).json({
      message: "this is admin route for new ",
      packageDetail: packageDetail,
    });
  } catch (err) {
    console.error("error in fetching datafrom database", err);
  }
});

router.post("/package", async (req, res) => {
  const { packageName, description, picture, location, dates, price } =
    req.body;
  try {
    let newPackageDetail = await Package.findOne({ packageName: packageName });
    const formatedDates = dates.map((date) =>
      moment(date, "DD-MM-YYYY").toISOString()
    );
    if (!newPackageDetail) {
      newPackageDetail = await Package.create({
        packageName: packageName,
        description: description,
        picture: picture,
        location: location,
        dates: formatedDates,
        price: price,
      });
      newPackageDetail.save();
      return res.status(200).json({
        message: "Package added",
        packageDetail: newPackageDetail,
      });
    } else {
      return res.status(200).json({
        message: "package already available",
        packageDetail: newPackageDetail,
      });
    }
  } catch (err) {
    console.error("error while posting new package detail", err);
    return res.status(400).json({ message: "invalid request" });
  }
});

router.get("/package/:id", async (req, res) => {
  const { id } = req.query;
  const packageDetail = await Package.findOne(id);

  const bookingIds = packageDetail.booking;
  const bookingDetailsPromises = bookingIds.map(async (bookingId) => {
    return await Booking.findById(bookingId);
  });
  const bookingDetails = await Promise.all(bookingDetailsPromises);
  return res.json({ package: packageDetail,Booking:bookingDetailsPromises });
});

router.put("/package/:id/edit", async (req, res) => {
  const { id } = req.params;
  try {
    const updatePackage = await Package.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: "package updated", updatePackage: updatePackage });
  } catch (err) {
    console.error("error while updating", err.message);
    res.status(400).json({ message: "bad request", error: err.message });
  }
});

router.delete("/package/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Package.findByIdAndDelete(id);
    return res.status(200).json({ message: "package deleted" });
    Package.save();
  } catch (err) {
    console.error("error while Deleting", err.message);
    res.status(400).json({ message: "bad request", error: err.message });
  }
});

export { router as adminRoute }; //function exported

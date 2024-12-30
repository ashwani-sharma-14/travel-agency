import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { availableDate } from "../utils/dates";

import "./Details.css";
export default function Details() {
  const location = useLocation();
  const pkgDetail = location.state;
  if (!pkgDetail) {
    console.log("not found");
  } else console.log(pkgDetail.pkgData);
  const pic = pkgDetail.pkgData.picture;
  const name = pkgDetail.pkgData.name;
  const loc = pkgDetail.pkgData.location;
  const price = pkgDetail.pkgData.price;
  const dates = pkgDetail.pkgData.dates;
  const id = pkgDetail.pkgData.id;
  const availableDates = dates.map(availableDate);
  const navigate = useNavigate();
  const booking = async () => {
    navigate(`/package/${id}/booking`, { state: { ...pkgDetail.pkgData } });
  };

  return (
    <>
      <div className="details-container">
        <h1 className="package-name">{name}</h1>
        <ImageList sx={{ width: 1000, height: 350 }} cols={2} rowHeight={10} className="image-list">
          {pic.map((item) => (
            <ImageListItem key={item} className="image-item">
              <img srcSet={item} src={item} loading="lazy" alt={name} />
            </ImageListItem>
          ))}
        </ImageList>
        <div className="description-container">
          <h2 className="description-title">Description</h2>
          <p className="description-text">
            Enjoy with your family and friends on {loc}. It will be an
            unforgettable trip for you and your loved ones. Our package provides
            the best services out there.
          </p>
          <p className="price">Price: {price}</p>
          <h2 className="available-dates-title">Available Dates</h2>
          <ul className="available-dates-list">
            {availableDates.map((date, index) => (
              <li key={index} className="available-date">{date}</li>
            ))}
          </ul>
        </div>
        <button onClick={booking} className="book-now-button">Book Now</button>
      </div>
    </>
  );
}

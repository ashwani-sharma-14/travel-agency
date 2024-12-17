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
  const id = pkgDetail.pkgData.id
  console.log(id)
  const availableDates = dates.map(availableDate);
  const navigate = useNavigate();
  const booking = async () => {
    navigate(`/package/${id}/booking`, { state: {...pkgDetail.pkgData} });
  };

  return (
    <>
      <div>
        <h1>{name}</h1>
        <ImageList sx={{ width: 1000, height: 350 }} cols={2} rowHeight={10}>
          {pic.map((item) => (
            <ImageListItem key={item}>
              <img srcSet={item} src={item} loading="lazy" />
            </ImageListItem>
          ))}
        </ImageList>
        <div>
          <h2>Description:</h2>
          <br />
          <h3>
            Enjoy with your family and friends on {loc} it will be an
            unforgattable trip for you and your loved once, Our package provides
            best services out there.{" "}
          </h3>
          <br />
          <h3>Price:{price}</h3>
          <h3>
            Available Date:{" "}
            <ol>
              <li>{availableDates[0]}</li>
              <li>{availableDates[1]}</li>
              <li>{availableDates[2]}</li>
            </ol>
          </h3>
        </div>
        <br />
        <button onClick={booking}>Book Now</button>
      </div>
    </>
  );
}

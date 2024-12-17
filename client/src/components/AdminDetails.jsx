import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { availableDate } from "../utils/dates";
import "./AdminDetails.css";
import { AdminDeleteApi } from "../Apis/adminApI";


export default function AdminDetails() {
    const location = useLocation();
    const navigate = useNavigate();
    const pkgDetail = location.state;
  
    if (!pkgDetail) {
      return <div>Package details not found.</div>;
    }
    console.log(pkgDetail)
  
    const { picture, packageName, location: loc, price, dates, _id } = pkgDetail.package;
    const availableDates = dates.map(availableDate);
const delete_package = async()=>{
await AdminDeleteApi(_id);
navigate("/admin");
};
    return (
      <div>
        <h1>{packageName}</h1>
        <ImageList sx={{ width: 1000, height: 350 }} cols={2} rowHeight={164}>
          {picture.map((item, index) => (
            <ImageListItem key={index}>
              <img srcSet={item} src={item} alt={`Package image ${index}`} loading="lazy" />
            </ImageListItem>
          ))}
        </ImageList>
        <div>
          <h2>Description:</h2>
          <p>
            Enjoy with your family and friends in {loc}. It will be an unforgettable trip for you and your loved ones. Our package provides the best services available.
          </p>
          <p><strong>Price:</strong> {price}</p>
          <p><strong>Available Dates:</strong></p>
          <ul>
            {availableDates.map((date, index) => (
              <li key={index}>{date}</li>
            ))}
          </ul>
        </div>
        <button onClick={delete_package} >Delete</button>
      </div>
    )
}


  
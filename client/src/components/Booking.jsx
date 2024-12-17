import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { bookingAPi } from "../Apis/bookingAPI";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { availableDate } from "../utils/dates";
import "./Booking.css"; // Import the CSS file
import Button from "@mui/material/Button";
export default function Booking() {
    const navigate = useNavigate();
  const location = useLocation();
  const result = location.state;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    numberofTravelers: "",
    selectedDate: "",
    mobile: "",
  });

  const id = result.id;

  const submitHandler = async (event) => {
    event.preventDefault();
    const response = await bookingAPi(id, formData);
    if(response){
        navigate('/invoice',{state:{...response}});
    }
    console.log("form submitted",response);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const dates = result.dates;
  const availableDates = dates.map(availableDate);

  return (
    <>
      <h1>Submit your booking for {result.name}</h1>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "100%" },
          display: "flex",
          flexDirection: "column",
        }}
        noValidate
        autoComplete="off"
        onSubmit={submitHandler}
        className="form"
      >
        <TextField
          type="text"
          name="name"
          id="name"
          label="Name"
          variant="outlined"
          value={formData.name}
          onChange={handleInputChange}
        />
        <TextField
          type="email"
          name="email"
          id="email"
          label="Email"
          variant="outlined"
          value={formData.email}
          onChange={handleInputChange}
        />
        <TextField
          type="number"
          name="phone"
          id="mobile"
          label="Phone"
          variant="outlined"
          InputProps={{ inputProps: { min: 1111111111 } }}
          value={formData.phone}
          onChange={handleInputChange}
          className="no-spinner" // Add this class to the input
        />
        <TextField
          type="number"
          name="numberofTravelers"
          id="numberOfTravelers"
          label="Number of Travelers"
          variant="outlined"
          InputProps={{ inputProps: { min: 1, max: 10 } }}
          value={formData.numberofTravelers}
          onChange={handleInputChange}
          className="no-spinner"
        />
        <TextField
          id="selectedDate"
          select
          name="selectedDate"
          label="Select Date"
          value={formData.selectedDate}
          onChange={handleInputChange}
          helperText="Please select your travel date"
          defaultValue=""
        >
          {availableDates.map((date) => (
            <MenuItem key={date} value={date}>
              {date}
            </MenuItem>
          ))}
        </TextField>
        <Button type="submit" variant="outlined">Submit</Button>
      </Box>
    </>
  );
}

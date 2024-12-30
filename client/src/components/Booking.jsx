import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { bookingAPi } from "../Apis/bookingAPI";
import { availableDate } from "../utils/dates";
import "./Booking.css"; // Import the CSS file

export default function Booking() {
  const navigate = useNavigate();
  const location = useLocation();
  const result = location.state;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    numberofTravelers: "",
    selectedDate: "",
    phone: "",
  });

  const id = result.id;

  const submitHandler = async (event) => {
    event.preventDefault();
    const response = await bookingAPi(id, formData);
    if (response) {
      navigate('/invoice', { state: { ...response } });
    }
    console.log("form submitted", response);
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
  
      <form onSubmit={submitHandler} className="form">
      <h1 className="detail-heading">Submit your booking for {result.name}</h1>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="number"
            name="phone"
            id="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="numberofTravelers">Number of Travelers</label>
          <input
            type="number"
            name="numberofTravelers"
            id="numberOfTravelers"
            value={formData.numberofTravelers}
            onChange={handleInputChange}
            min="1"
            max="10"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="selectedDate">Select Date</label>
          <select
            name="selectedDate"
            id="selectedDate"
            value={formData.selectedDate}
            onChange={handleInputChange}
            required
          >
            <option value="" disabled>
              Select your travel date
            </option>
            {availableDates.map((date) => (
              <option key={date} value={date}>
                {date}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </>
  );
}

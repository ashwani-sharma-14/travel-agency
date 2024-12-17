import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Invoice() {
  const [invoice, setInvoice] = useState({
    name: "",
    email: "",
    phone: "",
    package: "",
    numberOfTravelers: "",
    date: "",
    totalPrice: "",
  });

  const location = useLocation();
  const invoiceResponse = location.state;

  useEffect(() => {
    if (invoiceResponse) {
      setInvoice({
        name: invoiceResponse.customer.name,
        email: invoiceResponse.customer.email,
        phone: invoiceResponse.customer.phone,
        package: invoiceResponse.package.name,
        numberOfTravelers: invoiceResponse.customer.numberOfTravelers,
        date: invoiceResponse.customer.date,
        totalPrice: invoiceResponse.totalPrice,
      });
    }
  }, [invoiceResponse]);


  

  return (
    <div className="invoice">
      <h1>Invoice</h1>
      <div className="invoice-details">
        <p><strong>Name:</strong> {invoice.name}</p>
        <p><strong>Email:</strong> {invoice.email}</p>
        <p><strong>Phone:</strong> {invoice.phone}</p>
        <p><strong>Package:</strong> {invoice.package}</p>
        <p><strong>Number of Travelers:</strong> {invoice.numberOfTravelers}</p>
        <p><strong>Date:</strong> {invoice.date}</p>
        <p><strong>Total Price:</strong> ${invoice.totalPrice}</p>
      </div>
      <button>Back</button>
    </div>
  );
}


import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Box,
  Typography,
  Container,
  CssBaseline,
} from "@mui/material";


export default function AdminNewPackage() {
  const [formData, setFormData] = useState({
    packageName: "",
    description: "",
    picture: "",
    location: "",
    dates: "",
    price: "",
  });

  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const datesArray = formData.dates.split(",").map((date) =>
      moment(date.trim(), "DD-MM-YYYY").toISOString()
    );

    try {
      const response = await axios.post("http://localhost:8080/package", {
        ...formData,
        dates: datesArray,
      });
      setResponseMessage(response.data.message);
    } catch (error) {
      console.error("There was an error submitting the form!", error);
      setResponseMessage("Invalid request");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Add New Package
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="packageName"
            label="Package Name"
            name="packageName"
            autoComplete="packageName"
            autoFocus
            value={formData.packageName}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="description"
            label="Description"
            name="description"
            autoComplete="description"
            value={formData.description}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="picture"
            label="Picture URL"
            name="picture"
            autoComplete="picture"
            value={formData.picture}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="location"
            label="Location"
            name="location"
            autoComplete="location"
            value={formData.location}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="dates"
            label="Dates (comma-separated DD-MM-YYYY)"
            name="dates"
            autoComplete="dates"
            value={formData.dates}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="price"
            label="Price"
            name="price"
            autoComplete="price"
            value={formData.price}
            onChange={handleChange}
          />
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
            Submit
          </Button>
        </Box>
        {responseMessage && (
          <Typography variant="body2" color="textSecondary" align="center">
            {responseMessage}
          </Typography>
        )}
      </Box>
    </Container>
  );
}

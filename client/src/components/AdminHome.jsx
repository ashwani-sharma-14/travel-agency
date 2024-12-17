import { useNavigate } from "react-router-dom";
import { adminHomeApi } from "../Apis/adminApI";
import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { availableDate } from "../utils/dates";
import { adminDetailApi } from "../Apis/adminApI";
import { Button } from "@mui/material";
export default function AdminHome() {
  const [packages, setPackages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const dataFetched = async () => {
      try {
        const result = await adminHomeApi();
        console.log(result);
        setPackages(result.packageDetail);
        console.log(result.packageDetail);
      } catch (err) {
        console.error(`Error in data: ${err}`);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    dataFetched();
  }, []);

  if (loading) {
    return <div>Loading.......</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const details = async (id) => {
      try {
        const result = await adminDetailApi(id);
        if (result) {
          navigate(`/adminDetail/${id}`, { state: { ...result } });
        }
      } catch (err) {
        console.log(err.message);
      }
    };


  return (
    <>
    
    <div className="packages-card">
      {packages.map((pkg) => {
        const { packageName, picture, dates, location, _id } = pkg;
        const availableDates = dates.map(availableDate);

        return (
          <Card
            key={_id}
            sx={{ maxWidth: 345, margin: "20px auto" }}
            onClick={() => details(_id)}
          >
            <CardMedia
              component="img"
              sx={{ height: 200 }}
              image={picture[0]}
              title={packageName}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {packageName}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.primary" }}>
                City: {location}
              </Typography>
              <Typography className="dates" variant="body2" component="ol">
                Available Dates:
                <ol>
                  {availableDates.map((date, index) => (
                    <li key={index}>{date}</li>
                  ))}
                </ol>
              </Typography>
            </CardContent>
            <CardActions>

            </CardActions>
          </Card>
          
        );
      })}
    </div>
    <Button onClick={()=>{navigate("/adminnewpackage")}} >New Package</Button>
  </>
  );
}

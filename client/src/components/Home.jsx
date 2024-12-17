import React, { useEffect, useState } from "react";
import "./Home.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { homeAPI } from "../Apis/homeApi";
import { detailAPi } from "../Apis/detailAPI";
import { useNavigate } from "react-router-dom";
import { availableDate } from "../utils/dates";
export default function Home() {
  const [packages, setPackages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  useEffect(() => {
    const dataFetched = async () => {
      try {
        const result = await homeAPI();
        setPackages(result.pkgData);
        console.log(result.pkgData);
        console.log(result.id);
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
      const result = await detailAPi(id);
      if (result) {
        navigate(`/details/${id}`, { state: { ...result } });
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="packages-card">
      {packages.map((pkg) => {
        const name = pkg.name;
        const pictures = pkg.picture;
        const index = pkg.index;
        const dates = pkg.dates;
        const location = pkg.location;
        const availableDates = dates.map(availableDate);

        return (
          <Card
            key={index}
            sx={{ maxWidth: 345, margin: "20px auto" }}
            onClick={() => details(pkg.id)}
          >
            <CardMedia
              component="img"
              sx={{ height: 200 }}
              image={pictures[0]}
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {name}
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
            <CardActions></CardActions>
          </Card>
        );
      })}
    </div>
  );
}

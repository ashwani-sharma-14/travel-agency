import React, { useEffect, useState } from "react";
import "./Home.css";
import { homeAPI } from "../Apis/homeApi";
import { detailAPi } from "../Apis/detailAPI";
import { useNavigate } from "react-router-dom";
import { availableDate } from "../utils/dates";
import AdminHome from "./AdminHome";

export default function Home() {
  const [packages, setPackages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const dataFetched = async () => {
      try {
        const result = await homeAPI();
        setPackages(result.pkgData);
      } catch (err) {
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

  const renderAdmin = () => {
    navigate("/admin");
  };

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
    <>
      <div className="hero-section" >
        <h1 className="hero-title">Welcome to Odyssey Horizons</h1>
        <p className="hero-quote">"The world is a book, and those who do not travel read only one page." - Saint Augustine</p>
        <button className="hero-button">Discover Now</button>
      </div>

      <div className="packages-card">
        {packages.map((pkg) => {
          const name = pkg.name;
          const pictures = pkg.picture;
          const index = pkg.index;
          const dates = pkg.dates;
          const location = pkg.location;
          const availableDates = dates.map(availableDate);

          return (
            <div key={index} className="card" onClick={() => details(pkg.id)}>
              <div
                className="image"
                style={{
                  backgroundImage: `url(${pictures[0]})`,
                  backgroundSize: "cover",
                }}
              ></div>
              <div className="information">
                <div className="heading">{name}</div>
                <div className="description">
                  Enjoy with your family and friends on {location}. It will be an
                  unforgettable trip for you and your loved ones. Our package provides
                  the best services out there.
                </div>
                <div className="available-dates">
                  <strong>Available Dates:</strong> {availableDates.join(', ')}
                </div>
                <button className="learn-more" onClick={() => details(pkg.id)}>
                  Learn More
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <button className="admin-button" onClick={renderAdmin}>Admin</button>
    </>
  );
}

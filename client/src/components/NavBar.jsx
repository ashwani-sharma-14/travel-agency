import React from "react";
import "./NavBar.css";
import SearchIcon from "@mui/icons-material/Search";
export default function NavBar() {
  return (
    <>
      <div className="nav">
       <a className="title" href="/home"><h1 >Odyssey Horizons</h1></a> 
        <ul className="navLinks">
          <li>
            <a href="/home">Home</a>
          </li>
          <li>
            <a href="/categories">Categories</a>
          </li>
          <li>
            <a href="/mybooking">My booking</a>
          </li>
        </ul>

        <div className="search">
          <input type="text" placeholder="search your destination" />
          <button className="searchButton">
            <SearchIcon className="searchIcon" />
          </button>
        </div>

        <div className="contact">
          <ul className="contactLinks">
            <li>
              <a href="/about">About us</a>
            </li>
            <li>
              <a href="/contact us">Contact us</a>
            </li>
          </ul>
        </div>
        <div className="region">
          <label htmlFor="Region">choose your region</label>
          <br />
          <select name="Region" id="region">
            <option value="Select">Select</option>
            <option value="India">India</option>
            <option value="UK">UK</option>
            <option value="US">US</option>
          </select>
        </div>

        <div className="user">
            <button><span style={{textDecoration:'none'}}><a href="/login">Login</a></span></button>
        </div>
      </div>
    </>
  );
}

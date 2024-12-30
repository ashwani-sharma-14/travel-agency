import React from "react";
import "./Footer.css"; // Import the CSS file

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section" id="about-us">
          <h2>About Us</h2>
          <p>
            Welcome to Odyssey Horizons! We are dedicated to creating unforgettable journeys and cherished memories for our clients. With a passion for exploration and adventure, we provide the best travel packages and exceptional services to ensure your experience is nothing short of extraordinary.
          </p>
        </div>
   
        <div className="footer-section" id="contact-us">
          <h2>Contact Us</h2>
          <p>Feel free to reach out to us for any inquiries or assistance:</p>
          <ul>
            <li>Email: info@odysseyhorizons.com</li>
            <li>Phone: +91 12345 67890</li>
            <li>Address: 1234 Travel Lane, Wanderlust City, India</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Odyssey Horizons. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

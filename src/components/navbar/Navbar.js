import React from "react";
import logo from "../../assets/logo.png"; // Corrected path
import "./Navbar.css"; // Import custom CSS for additional styling

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img src={logo} alt="App Logo" className="d-inline-block align-top" width="40" height="40" />
          NewsApp
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        
      </div>
    </nav>
  );
};

export default Navbar;

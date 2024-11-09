import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Bell, X } from "lucide-react";
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [fullName, setFullName] = useState(""); // State for user's name
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await fetch("http://64.23.180.219:8080/api/auth/username", {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setFullName(data.fullname);
        } else {
          console.error("Error fetching username");
        }
      } catch (error) {
        console.error("Error in request:", error);
      }
    };
    fetchUserName();
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://64.23.180.219:8080/api/auth/signout", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        console.log("Logout successful");
        navigate("/login");
      } else {
        console.error("Logout error");
      }
    } catch (error) {
      console.error("Request error:", error);
    }
  };

  return (
    <>
      <nav className="navbar">
        <button className="menu-button" onClick={toggleMenu} aria-label="Toggle menu">
          <Menu />
        </button>

        <div className="right-section">
          <button className="notification-button" aria-label="Notifications">
            <Bell />
          </button>

          {/* Display user's full name instead of avatar */}
          <div className="username-display">{fullName || "User"}</div>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="sidebar">
          <div className="sidebar-header">
            <h2>Menu</h2>
            <button onClick={toggleMenu} aria-label="Close menu">
              <X />
            </button>
          </div>
          <ul className="sidebar-menu">
            <li><a href="#">Home</a></li>
            <li><a href="#">Profile</a></li>
            <li><a href="#">Settings</a></li>
            <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
          </ul>
        </div>
      )}

      {isMenuOpen && <div className="overlay" onClick={toggleMenu}></div>}
    </>
  );
};

export default Navbar;

import React, { useState, useEffect } from "react";
import "./UserProfile.css";
import Navbar from "../Navbar/Navbar";
import lol from "../../images/default_pfp.jpg";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const [contracts, setContracts] = useState([]); // State for contracts
  const [fullName, setFullName] = useState(""); // State for user's name

  useEffect(() => {
    // Fetch user's name
    const fetchUserName = async () => {
      try {
        const response = await fetch(
          "https://ezcontract-e556acf4694e.herokuapp.com/api/auth/user",
          {
            credentials: "include",
          }
        );
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

    // Fetch contracts
    const fetchContracts = async () => {
      try {
        const response = await fetch(
          "https://ezcontract-e556acf4694e.herokuapp.com/api/users/contracts",
          {
            credentials: "include",
          }
        );
        if (response.ok) {
          const data = await response.json();
          setContracts(data);
        } else {
          console.error("Error fetching contracts");
        }
      } catch (error) {
        console.error("Error in request:", error);
      }
    };

    fetchUserName();
    fetchContracts();
  }, []);

  // Function to check if a day has a contract expiring
  const isContractExpiringOnDay = (day) => {
    const currentDate = new Date();
    const dateToCheck = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);

    return contracts.some(contract => {
      const contractEndDate = new Date(contract.endContract);
      return (
        contractEndDate.getFullYear() === dateToCheck.getFullYear() &&
        contractEndDate.getMonth() === dateToCheck.getMonth() &&
        contractEndDate.getDate() === dateToCheck.getDate()
      );
    });
  };

  const generateCalendar = () => {
    const days = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"];
    const currentDate = new Date();
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    const calendar = [];
    // Header row
    calendar.push(
      <div key="header" className="calendar-row">
        {days.map((day) => (
          <div key={day} className="calendar-cell header">
            {day}
          </div>
        ))}
      </div>
    );

    // Date cells
    let currentWeek = [];
    // Add empty cells for days before the first of the month
    for (let i = 0; i < firstDay.getDay(); i++) {
      currentWeek.push(<div key={`empty-${i}`} className="calendar-cell empty"></div>);
    }

    // Add days of the month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const isToday = day === currentDate.getDate();
      const isExpiring = isContractExpiringOnDay(day);

      currentWeek.push(
        <div
          key={day}
          className={`calendar-cell ${isToday ? "today" : ""} ${isExpiring ? "expiring-contract" : ""}`}
        >
          {day}
        </div>
      );

      if (currentWeek.length === 7) {
        calendar.push(
          <div key={`week-${day}`} className="calendar-row">
            {currentWeek}
          </div>
        );
        currentWeek = [];
      }
    }

    // Add remaining days
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(<div key={`empty-end-${currentWeek.length}`} className="calendar-cell empty"></div>);
      }
      calendar.push(
        <div key="last-week" className="calendar-row">
          {currentWeek}
        </div>
      );
    }

    return calendar;
  };

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-info">
            <div className="avatar">
              <img src={lol} alt="Profile" />
            </div>
            <div className="user-info">
              <h1>{fullName}</h1>
              <p className="stats">
                Contratos: {contracts.length} <span className="separator">•</span> Renovaciones pendientes: 0
              </p>
            </div>
          </div>
          <button className="edit-button">Editar Perfil</button>
        </div>

        <div className="content-grid">
          <div className="contracts-section">
            <h2>Contratos</h2>
            <div className="contracts-list">
              {contracts.map((contract) => (
                <div key={contract.id} className="contract-item">
                  <div className="contract-info">
                    <h3>
                      {contract.street}, {contract.numberHouse}
                    </h3>
                    <p>Expira el {contract.endContract}</p>
                  </div>
                  <div className="contract-actions">
                    <Link to={`/contract-details/${contract.id}`}>
                      <button className="details-button">Ver más detalles</button>
                    </Link>
                    <button className="renew-button">Renovar</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="calendar-section">
            <h2>Calendario</h2>
            <div className="calendar">
              <div className="calendar-header">
                <h3>Agosto</h3>
              </div>
              <div className="calendar-grid">{generateCalendar()}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;

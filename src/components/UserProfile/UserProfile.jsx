import React from "react";
import "./UserProfile.css";
import Navbar from "../Navbar/Navbar";

const UserProfile = () => {
  const contracts = [
    { id: 1, name: "Apartamento 123", expireDate: "29-09-2024" },
    { id: 2, name: "Casa 456", expireDate: "02-10-2024" },
    { id: 3, name: "Casa 456", expireDate: "02-10-2024" },
  ];

  const generateCalendar = () => {
    const days = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"];
    const currentDate = new Date();
    const firstDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const lastDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );

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
      currentWeek.push(
        <div key={`empty-${i}`} className="calendar-cell empty"></div>
      );
    }

    // Add days of the month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      currentWeek.push(
        <div
          key={day}
          className={`calendar-cell ${
            day === currentDate.getDate() ? "today" : ""
          }`}
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
        currentWeek.push(
          <div
            key={`empty-end-${currentWeek.length}`}
            className="calendar-cell empty"
          ></div>
        );
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
              <img src="/placeholder.svg" alt="Profile" />
            </div>
            <div className="user-info">
              <h1>Nombre de usuario</h1>
              <p className="stats">
                Contratos: 0 <span className="separator">•</span> Renovaciones
                pendientes: 0
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
                    <h3>{contract.name}</h3>
                    <p>Expira el {contract.expireDate}</p>
                  </div>
                  <div className="contract-actions">
                    <button className="details-button">Ver más detalles</button>
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

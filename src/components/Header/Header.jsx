import React from "react";
import { Calendar, Plus, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Header.css";

export default function Header() {
  const navigate = useNavigate(); // Hook para navegar

  const handleCreateContract = () => {
    navigate("/create-contract"); // Redirige a /create-contract
  };

  const handleUserProfile = () => {
    navigate("/user-profile"); // Redirige a /user-profile
  };

  return (
    <>
      <Navbar />
      <div className="dashboard">
        <h1>Hola, usuario</h1>

        <div className="main-grid">
          <div className="expiring-contracts">
            <div className="card-header">
              <div>
                <h2>Contratos próximos a expirar</h2>
                <p>3 contratos de alquileres expirarán en los próximos 30 días.</p>
              </div>
              <Calendar className="calendar-icon" />
            </div>
            <div className="card-content">
              {[
                { name: "Apartamento 123", date: "29-09-2024" },
                { name: "Casa 456", date: "02-10-2024" },
                { name: "Casa 456", date: "02-10-2024" },
              ].map((contract, index) => (
                <div key={index} className="contract-item">
                  <div>
                    <h3>{contract.name}</h3>
                    <p>Expira el {contract.date}</p>
                  </div>
                  <button className="btn btn-renew">Renovar</button>
                </div>
              ))}
              <button className="btn btn-outline" onClick={handleUserProfile}>Ver tus contratos</button>
            </div>
          </div>

          <div className="actions">
            <div className="action-card">
              <div className="icon-wrapper">
                <Plus className="icon" />
              </div>
              <h3>Crear nuevo contrato de alquiler</h3>
              <button className="btn btn-primary" onClick={handleCreateContract}>
                Empezar
              </button>
            </div>

            <div className="action-card">
              <div className="icon-wrapper">
                <RotateCcw className="icon" />
              </div>
              <h3>Renovar contrato existente</h3>
              <button className="btn btn-primary" onClick={handleUserProfile}>
                Empezar
              </button>
            </div>
          </div>
        </div>

        <div className="about-section">
          <h2>Acerca de esta aplicación</h2>
          <p>
            Esta herramienta permite a los usuarios, tanto arrendadores como
            arrendatarios, mantener un control detallado y automatizado sobre
            sus contratos, ofreciendo recordatorios automáticos para fechas
            importantes, opciones de renovación, y un historial de pagos.
          </p>
        </div>
      </div>
    </>
  );
}

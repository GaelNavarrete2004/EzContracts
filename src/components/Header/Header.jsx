import React, { useState, useEffect } from "react";
import { Calendar, Plus, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Header.css";

export default function Header() {
  const [fullName, setFullName] = useState(""); // State for user's name
  const [contracts, setContracts] = useState([]); // State for contracts
  const navigate = useNavigate(); // Hook para navegar

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

  const handleCreateContract = () => {
    navigate("/create-contract"); // Redirige a /create-contract
  };

  const handleUserProfile = () => {
    navigate("/user-profile"); // Redirige a /user-profile
  };

  // Filter contracts that are expiring within the next 30 days
  const expiringContracts = contracts.filter((contract) => {
    const endContractDate = new Date(contract.endContract);
    const today = new Date();
    const thirtyDaysFromNow = new Date(today);
    thirtyDaysFromNow.setDate(today.getDate() + 30);

    return endContractDate >= today && endContractDate <= thirtyDaysFromNow;
  });

  return (
    <>
      <Navbar />
      <div className="dashboard">
        <h1>Hola, {fullName}</h1>

        <div className="main-grid">
          <div className="expiring-contracts">
            <div className="card-header">
              <div>
                <h2>Contratos próximos a expirar</h2>
                <p>{expiringContracts.length} contratos de alquiler expirarán en los próximos 30 días.</p>
              </div>
              <Calendar className="calendar-icon" />
            </div>
            <div className="card-content">
              {expiringContracts.map((contract, index) => (
                <div key={contract.id || index} className="contract-item">
                  <div>
                    <h3>{contract.street}, {contract.numberHouse}</h3>
                    <p>Expira el {contract.endContract}</p>
                  </div>
                  <button className="btn btn-renew">Renovar</button>
                </div>
              ))}
              <button className="btn btn-outline" onClick={handleUserProfile}>
                Ver tus contratos
              </button>
            </div>
          </div>

          <div className="actions">
            <div className="action-card">
              <div className="icon-wrapper">
                <Plus className="icon" />
              </div>
              <h3>Crear nuevo contrato de alquiler</h3>
              <button
                className="btn btn-primary"
                onClick={handleCreateContract}
              >
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

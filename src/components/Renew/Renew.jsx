import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import "./Renew.css";
import Navbar from "../Navbar/Navbar";

const Renew = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [contractData, setContractData] = useState({
    startContract: "",
    endContract: "",
    cost: "",
    renterName: "",
    renterEmail: "",
    ownerName: "",
    ownerEmail: "",
    street: "",
    numberHouse: "",
    suburb: "",
    state: "",
    zip: "",
    country: "",
  });

  useEffect(() => {
    if (!id) {
      console.error("No se encontró el ID del contrato.");
      return;
    }

    const fetchContractData = async () => {
      try {
        const token = Cookies.get("quackCookie");
        const response = await fetch(
          `https://ezcontract-e556acf4694e.herokuapp.com/api/users/contracts/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
          }
        );
        if (response.ok) {
          const data = await response.json();
          setContractData(data);
        } else {
          console.error("Error al cargar el contrato.");
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };

    fetchContractData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContractData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ownerName: contractData.ownerName,
      ownerEmail: contractData.ownerEmail,
      renterName: contractData.renterName,
      renterEmail: contractData.renterEmail,
      street: contractData.street,
      numberHouse: contractData.numberHouse,
      suburb: contractData.suburb,
      zip: contractData.zip,
      state: contractData.state,
      country: contractData.country,
      startContract: contractData.startContract,
      endContract: contractData.endContract,
      cost: parseFloat(contractData.cost),
    };

    try {
      const token = Cookies.get("quackCookie");
      const response = await fetch(
        `https://ezcontract-e556acf4694e.herokuapp.com/api/users/contract/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        console.log("Contrato actualizado exitosamente");
        navigate("/user-profile");
      } else {
        console.error("Error al actualizar el contrato");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="contract-form">
        <h1>Renovar contrato</h1>
        <p className="subtitle">Actualice la información del contrato</p>

        <form onSubmit={handleSubmit}>
          <section>
            <h2>Datos del propietario</h2>
            <div className="form-row">
              <div className="form-group">
                <label>Nombre completo del propietario</label>
                <input
                  type="text"
                  name="ownerName"
                  value={contractData.ownerName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Correo electrónico del propietario</label>
                <input
                  type="email"
                  name="ownerEmail"
                  value={contractData.ownerEmail}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </section>

          <section>
            <h2>Datos del inquilino</h2>
            <div className="form-row">
              <div className="form-group">
                <label>Nombre completo del inquilino</label>
                <input
                  type="text"
                  name="renterName"
                  value={contractData.renterName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Correo electrónico del inquilino</label>
                <input
                  type="email"
                  name="renterEmail"
                  value={contractData.renterEmail}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </section>

          <section>
            <h2>Datos de la propiedad</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Calle</label>
                <input
                  type="text"
                  name="street"
                  value={contractData.street}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Número exterior</label>
                <input
                  type="text"
                  name="numberHouse"
                  value={contractData.numberHouse}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Colonia</label>
                <input
                  type="text"
                  name="suburb"
                  value={contractData.suburb}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Código Postal (CP)</label>
                <input
                  type="text"
                  name="zip"
                  value={contractData.zip}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Estado</label>
                <input
                  type="text"
                  name="state"
                  value={contractData.state}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>País</label>
                <input
                  type="text"
                  name="country"
                  value={contractData.country}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </section>

          <section>
            <h2>Datos del contrato</h2>
            <div className="form-row">
              <div className="form-group">
                <label>Fecha de inicio del contrato</label>
                <input
                  type="date"
                  name="startContract"
                  value={contractData.startContract}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Fecha de finalización del contrato</label>
                <input
                  type="date"
                  name="endContract"
                  value={contractData.endContract}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Monto total de la renta</label>
              <input
                type="number"
                name="cost"
                value={contractData.cost}
                onChange={handleInputChange}
              />
            </div>
          </section>

          <button type="submit" className="save-button">
            Actualizar contrato
          </button>
        </form>
      </div>
    </>
  );
};

export default Renew;

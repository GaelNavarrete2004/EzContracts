import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import "./CreateContract.css";
import Navbar from "../Navbar/Navbar";

export default function CreateContract() {
  const [formData, setFormData] = useState({
    ownerName: "",
    ownerEmail: "",
    tenantName: "",
    tenantEmail: "",
    street: "",
    exteriorNumber: "",
    neighborhood: "",
    postalCode: "",
    state: "",
    country: "",
    startDate: "",
    endDate: "",
    rentAmount: "",
    securityDeposit: "",
    clauses: {},
  });

  const [clauses, setClauses] = useState([]);

  useEffect(() => {
    const fetchClauses = async () => {
      try {
        const response = await fetch(
          "http://64.23.180.219:8080/api/public/clauses",
          {
            method: "GET",
            credentials: "include", 
          }
        );
        if (response.ok) {
          const data = await response.json();
          setClauses(data.content);
        } else {
          console.error("Error al obtener las cláusulas.");
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };
    fetchClauses();
  }, []);

  const handleInputChange = (e) => {
    const { name, checked, type, value } = e.target;
    if (type === "checkbox" && name.startsWith("clause-")) {
      setFormData((prevState) => ({
        ...prevState,
        clauses: {
          ...prevState.clauses,
          [name]: checked,
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSaveContract = async () => {
    const selectedClauses = Object.keys(formData.clauses)
      .filter((clauseKey) => formData.clauses[clauseKey])
      .map((clauseKey) => ({ id: parseInt(clauseKey.split("-")[1], 10) }));

    const payload = {
      ownerName: formData.ownerName,
      ownerEmail: formData.ownerEmail,
      renterName: formData.tenantName,
      renterEmail: formData.tenantEmail,
      street: formData.street,
      numberHouse: formData.exteriorNumber,
      suburb: formData.neighborhood,
      zip: formData.postalCode,
      state: formData.state,
      country: formData.country,
      startContract: formData.startDate,
      endContract: formData.endDate,
      cost: parseFloat(formData.rentAmount),
      clausesId: selectedClauses,
    };

    try {
      const response = await fetch(
        "http://64.23.180.219:8080/api/users/contract",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
          credentials: "include",
        }
      );
      if (response.ok) {
        console.log("Contrato guardado exitosamente.");
      } else {
        console.error("Error al guardar el contrato.");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="contract-form">
        <h1>Crear un nuevo contrato</h1>
        <p className="subtitle">Rellene el siguiente formulario</p>

        <form>
          <section>
            <h2>Datos del propietario</h2>
            <div className="form-row">
              <div className="form-group">
                <label>Nombre completo del propietario</label>
                <input
                  type="text"
                  name="ownerName"
                  placeholder="Ingrese el nombre completo según una identificación oficial"
                  value={formData.ownerName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Correo electrónico del propietario</label>
                <input
                  type="email"
                  name="ownerEmail"
                  placeholder="ejemplo@email.com"
                  value={formData.ownerEmail}
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
                  name="tenantName"
                  placeholder="Ingrese el nombre completo según una identificación oficial"
                  value={formData.tenantName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Correo electrónico del inquilino</label>
                <input
                  type="email"
                  name="tenantEmail"
                  placeholder="ejemplo@email.com"
                  value={formData.tenantEmail}
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
                  placeholder="Ej. Zaragoza"
                  value={formData.street}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Número exterior</label>
                <input
                  type="text"
                  name="exteriorNumber"
                  placeholder="Ej. 100"
                  value={formData.exteriorNumber}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Colonia</label>
                <input
                  type="text"
                  name="neighborhood"
                  placeholder="Ej. Revolución"
                  value={formData.neighborhood}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Código Postal (CP)</label>
                <input
                  type="text"
                  name="postalCode"
                  placeholder="Ej. 45810"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Estado</label>
                <input
                  type="text"
                  name="state"
                  placeholder="Ej. Jalisco"
                  value={formData.state}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>País</label>
                <input
                  type="text"
                  name="country"
                  placeholder="Ej. México"
                  value={formData.country}
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
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Fecha de finalización del contrato</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Monto total de la renta</label>
                <input
                  type="number"
                  name="rentAmount"
                  value={formData.rentAmount}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Depósito de seguridad (Opcional)</label>
                <input
                  type="number"
                  name="securityDeposit"
                  value={formData.securityDeposit}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </section>

          <section>
            <h2>Cláusulas adicionales del contrato</h2>
            {clauses.map((clause) => (
              <div key={clause.id} className="checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name={`clause-${clause.id}`}
                    checked={formData.clauses[`clause-${clause.id}`] || false}
                    onChange={handleInputChange}
                  />
                  <span>{clause.title}</span>
                  <p className="checkbox-description">{clause.description}</p>
                </label>
              </div>
            ))}
          </section>

          <button
            type="button"
            onClick={handleSaveContract}
            className="save-button"
          >
            Guardar Contrato
          </button>
        </form>
      </div>
    </>
  );
}

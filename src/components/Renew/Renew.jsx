import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import Navbar from "../Navbar/Navbar";
import "./Renew.css";

export default function Renew() {
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
    ownerTermination: false,
    tenantTermination: false,
    modifications: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <>
      <Navbar />
      <div className="contract-form">
        <h1>Renovar contrato de usuario</h1>
        <p className="subtitle">Rellene el siguiente formulario</p>

        <form onSubmit={handleSubmit}>
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
                <div className="select-wrapper">
                  <select
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                  >
                    <option value="">Selecciona una fecha</option>
                  </select>
                  <ChevronDown className="select-icon" />
                </div>
              </div>
              <div className="form-group">
                <label>Fecha de finalización del contrato</label>
                <div className="select-wrapper">
                  <select
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                  >
                    <option value="">Selecciona una fecha</option>
                  </select>
                  <ChevronDown className="select-icon" />
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Monto total de la renta</label>
                <div className="currency-input">
                  <span>$0</span>
                  <input
                    type="number"
                    name="rentAmount"
                    value={formData.rentAmount}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Depósito de seguridad (Opcional)</label>
                <div className="currency-input">
                  <span>$0</span>
                  <input
                    type="number"
                    name="securityDeposit"
                    value={formData.securityDeposit}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2>Cláusulas adicionales del contrato</h2>
            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="ownerTermination"
                  checked={formData.ownerTermination}
                  onChange={handleInputChange}
                />
                <span>El propietario termina el contrato</span>
                <p className="checkbox-description">
                  Si el dueño de la propiedad decide no renovar la duración, el
                  arrendatario deberá recibir una notificación 30 días antes de
                  que acabe el convenio, así el inquilino podrá buscar otra
                  propiedad
                </p>
              </label>
            </div>
            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="tenantTermination"
                  checked={formData.tenantTermination}
                  onChange={handleInputChange}
                />
                <span>El inquilino termina el contrato</span>
                <p className="checkbox-description">
                  Si el inquilino decide rescindir del contrato deberá avisar al
                  propietario con 30 días de antelación por medio de un escrito.
                  Además, deberá cubrir una cuota de condonación por la
                  cancelación del convenio. Si la suspensión se hace durante
                  el...
                </p>
              </label>
            </div>
            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="modifications"
                  checked={formData.modifications}
                  onChange={handleInputChange}
                />
                <span>Modificaciones</span>
                <p className="checkbox-description">
                  El arrendatario no podrá realizar modificaciones
                  estructurales, decorativas o de cualquier tipo sin el
                  consentimiento previo por escrito del arrendador
                </p>
              </label>
            </div>
          </section>
        </form>
      </div>
    </>
  );
}

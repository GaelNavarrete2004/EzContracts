import React from "react";
import { RotateCcw, Ban, Printer, Download, ChevronDown } from "lucide-react";
import "./ContractDetails.css";
import Navbar from "../Navbar/Navbar";

const ContractDetails = () => {
  const monthlyPayments = [
    { month: "Junio 2023", status: "paid", evidence: true },
    { month: "Julio 2023", status: "unpaid", evidence: false },
    { month: "Agosto 2023", status: "pending", evidence: false },
    { month: "Septiembre 2023", status: "pending", evidence: false },
    { month: "Octubre 2023", status: "pending", evidence: false },
    { month: "Noviembre 2023", status: "pending", evidence: false },
    { month: "Diciembre 2023", status: "pending", evidence: false },
    { month: "Enero 2024", status: "pending", evidence: false },
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case "paid":
        return "status-paid";
      case "unpaid":
        return "status-unpaid";
      default:
        return "status-pending";
    }
  };

  return (
    <>
      <Navbar />
      <div className="contract-details">
        <div className="details-grid">
          <div className="details-section">
            <div className="section-header">
              <h2>Detalles del contrato</h2>
              <button className="download-button">
                <Download size={20} />
              </button>
            </div>

            <div className="details-content">
              <div className="detail-row">
                <div className="detail-group">
                  <label>Fecha de inicio contrato</label>
                  <span>01 de Junio de 2023</span>
                </div>
                <div className="detail-group">
                  <label>Fecha de finalización del contrato</label>
                  <span>01 de Junio de 2024</span>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-group">
                  <label>Monto de la renta</label>
                  <span>$2,500.00 por mes</span>
                </div>
                <div className="detail-group">
                  <label>Depósito de seguridad</label>
                  <span>$2,500.00</span>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-group">
                  <label>Nombre del inquilino</label>
                  <span>Mahatma copil</span>
                </div>
                <div className="detail-group">
                  <label>Correo electrónico del inquilino</label>
                  <span>Mahatmacopil123@gmail.com</span>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-group">
                  <label>Nombre del propietario</label>
                  <span>Jane Smith</span>
                </div>
                <div className="detail-group">
                  <label>Correo electrónico del propietario</label>
                  <span>john@example.com</span>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-group full-width">
                  <label>Dirección de la propiedad</label>
                  <span>Calle 123, colonia #CP, estado, país</span>
                </div>
              </div>
            </div>
          </div>

          <div className="payments-section">
            <h2>Ingresos mensuales</h2>
            <div className="payments-list">
              {monthlyPayments.map((payment, index) => (
                <div key={index} className="payment-row">
                  <span className="month">{payment.month}</span>
                  <div className="payment-actions">
                    <span
                      className={`status ${getStatusClass(payment.status)}`}
                    >
                      {payment.status === "paid"
                        ? "Pagado"
                        : payment.status === "unpaid"
                        ? "Sin pagar"
                        : "Pendiente"}
                    </span>
                    <button
                      className={`evidence-button ${
                        payment.evidence ? "has-evidence" : ""
                      }`}
                    >
                      {payment.evidence ? "Evidencia" : "Subir evidencia"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button className="expand-button">
              <ChevronDown size={20} />
            </button>
          </div>
        </div>

        <div className="action-buttons">
          <button className="action-button renew">
            <RotateCcw size={20} />
            Renovar contrato
          </button>
          <button className="action-button print">
            <Printer size={20} />
            Imprimir contrato
          </button>
          <button className="action-button delete">
            <Ban size={20} />
            Eliminar contrato
          </button>
        </div>
      </div>
    </>
  );
};

export default ContractDetails;

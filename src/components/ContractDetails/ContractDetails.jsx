import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RotateCcw, Ban, Printer, Download, ChevronDown } from "lucide-react";
import Navbar from "../Navbar/Navbar";
import "./ContractDetails.css";

const ContractDetails = () => {
  const { id } = useParams();
  const [contractDetails, setContractDetails] = useState(null);

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

  useEffect(() => {
    const fetchContractDetails = async () => {
      try {
        const response = await fetch(
          `C`,
          { credentials: "include" }
        );
        if (response.ok) {
          const data = await response.json();
          setContractDetails(data);
        } else {
          console.error("Error fetching contract details");
        }
      } catch (error) {
        console.error("Error in request:", error);
      }
    };

    fetchContractDetails();
  }, [id]);

  if (!contractDetails) {
    return <p>Cargando detalles del contrato...</p>;
  }

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
                  <span>{contractDetails.startContract}</span>
                </div>
                <div className="detail-group">
                  <label>Fecha de finalización del contrato</label>
                  <span>{contractDetails.endContract}</span>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-group">
                  <label>Monto de la renta</label>
                  <span>{contractDetails.cost} por mes</span>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-group">
                  <label>Nombre del inquilino</label>
                  <span>{contractDetails.renterName}</span>
                </div>
                <div className="detail-group">
                  <label>Correo electrónico del inquilino</label>
                  <span>{contractDetails.renterEmail}</span>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-group">
                  <label>Nombre del propietario</label>
                  <span>{contractDetails.ownerName}</span>
                </div>
                <div className="detail-group">
                  <label>Correo electrónico del propietario</label>
                  <span>{contractDetails.ownerEmail}</span>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-group full-width">
                  <label>Dirección de la propiedad</label>
                  <span>{`${contractDetails.street}, ${contractDetails.numberHouse}, ${contractDetails.suburb}, ${contractDetails.state}, ${contractDetails.zip}, ${contractDetails.country}`}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="payments-section">
            <h2>Ingresos mensuales</h2>
            <div className="payments-list">
              {contractDetails.monthlyPayments && contractDetails.monthlyPayments.length > 0 ? (
                contractDetails.monthlyPayments.map((payment, index) => (
                  <div key={index} className="payment-row">
                    <span className="month">{payment.month}</span>
                    <div className="payment-actions">
                      <span className={`status ${getStatusClass(payment.status)}`}>
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
                ))
              ) : (
                <p>No hay información de pagos disponibles.</p>
              )}
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

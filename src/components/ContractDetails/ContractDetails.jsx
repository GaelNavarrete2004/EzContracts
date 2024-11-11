import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { RotateCcw, Ban, Printer, Download, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import jsPDF from "jspdf";
import "./ContractDetails.css";

const ContractDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
          `https://ezcontract-e556acf4694e.herokuapp.com/api/users/contracts/${id}`,
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

  const handlePrint = () => {
    if (contractDetails) {
      const doc = new jsPDF();

      // Encabezado del documento
      doc.setFontSize(18);
      doc.text("Contrato de Arrendamiento", 105, 20, { align: "center" });
      doc.setFontSize(12);
      doc.text("Número de Contrato: " + id, 105, 30, { align: "center" });

      // Línea divisoria
      doc.setLineWidth(0.5);
      doc.line(15, 35, 195, 35);

      // Información del contrato
      doc.setFontSize(12);
      doc.text("Detalles del Contrato", 15, 45);

      doc.setFontSize(10);
      doc.text(
        `Fecha de inicio del contrato: ${contractDetails.startContract}`,
        15,
        55
      );
      doc.text(
        `Fecha de finalización del contrato: ${contractDetails.endContract}`,
        15,
        65
      );
      doc.text(`Monto de la renta: $${contractDetails.cost} por mes`, 15, 75);

      // Información de las partes
      doc.text("Información del Inquilino", 15, 90);
      doc.text(`Nombre: ${contractDetails.renterName}`, 15, 100);
      doc.text(`Correo electrónico: ${contractDetails.renterEmail}`, 15, 110);

      doc.text("Información del Propietario", 15, 125);
      doc.text(`Nombre: ${contractDetails.ownerName}`, 15, 135);
      doc.text(`Correo electrónico: ${contractDetails.ownerEmail}`, 15, 145);

      // Dirección de la propiedad
      doc.text("Dirección de la Propiedad", 15, 160);
      doc.text(
        `${contractDetails.street}, ${contractDetails.numberHouse}, ${contractDetails.suburb}, ${contractDetails.state}, ${contractDetails.zip}, ${contractDetails.country}`,
        15,
        170
      );

      // Tabla de pagos mensuales
      if (
        contractDetails.monthlyPayments &&
        contractDetails.monthlyPayments.length > 0
      ) {
        doc.text("Pagos Mensuales", 15, 185);
        const payments = contractDetails.monthlyPayments.map(
          (payment, index) => [
            index + 1,
            payment.month,
            payment.status === "paid"
              ? "Pagado"
              : payment.status === "unpaid"
              ? "Sin pagar"
              : "Pendiente",
            payment.evidence ? "Sí" : "No",
          ]
        );

        doc.autoTable({
          head: [["#", "Mes", "Estado", "Evidencia"]],
          body: payments,
          startY: 190,
          styles: { fontSize: 9 },
        });
      } else {
        doc.text("No hay pagos mensuales disponibles.", 15, 185);
      }

      // Pie de página
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.text(`Página ${i} de ${pageCount}`, 105, 290, { align: "center" });
      }

      // Guardar PDF
      doc.save(`Contrato_${id}.pdf`);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "¿Estás seguro de que deseas eliminar este contrato?"
    );
    if (confirmed) {
      try {
        const response = await fetch(
          `https://ezcontract-e556acf4694e.herokuapp.com/api/users/contract/${id}`,
          {
            method: "DELETE",
            credentials: "include",
          }
        );
        if (response.ok) {
          alert("Contrato eliminado con éxito.");
          navigate("/contracts"); // Redirige al usuario a la página de contratos
        } else {
          alert("Error al eliminar el contrato.");
        }
      } catch (error) {
        console.error("Error en la solicitud de eliminación:", error);
      }
    }
  };

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
              {contractDetails.monthlyPayments &&
              contractDetails.monthlyPayments.length > 0 ? (
                contractDetails.monthlyPayments.map((payment, index) => (
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
          <Link to={`/renew/${id}`} className="action-button renew">
            <RotateCcw size={20} />
            Renovar contrato
          </Link>
          <button className="action-button print" onClick={handlePrint}>
            <Printer size={20} />
            Imprimir contrato
          </button>
          <button className="action-button delete" onClick={handleDelete}>
            <Ban size={20} />
            Eliminar contrato
          </button>
        </div>
      </div>
    </>
  );
};

export default ContractDetails;

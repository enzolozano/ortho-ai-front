import React from "react";
import { Modal, Button, Image } from "react-bootstrap";
import { generatePDFReportWeb } from "../../../utils/pdfHelper";
import { formatDate } from "../../../utils/dateHelper";

export const ResultModal = ({ show, onHide, patient, doctor, analysedImageBase64, cobbAngle }) => {

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Resultado da Análise</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* Imagem analisada */}
        <div>
          <p className="fw-bold">Imagem Analisada:</p>
          <Image
            src={`data:image/png;base64,${analysedImageBase64}`}
            fluid
            rounded
          />
          <p className="mt-2"><strong>Ângulo de Cobb calculado:</strong> {cobbAngle.toFixed(1)}°</p>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Fechar</Button>
        <Button
          variant="primary"
          onClick={() => generatePDFReportWeb({
            patient,
            doctor,
            analysedImageBase64,
            cobbAngle,
            logoPath: "/src/assets/logo.png"
          })}
        >
          Gerar Relatório
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

import jsPDF from "jspdf";
import { formatDate } from "../utils/dateHelper";

export const generatePDFReportWeb = ({
  patient,
  doctor,
  analysedImageBase64,
  cobbAngle,
  logoPath
}) => {
  const doc = new jsPDF('p', 'pt', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 40;
  let currentY = 50;

  // ==========================
  // Logo
  // ==========================
  if (logoPath) {
    const logoWidth = 180;
    const logoHeight = 180;
    doc.addImage(logoPath, "PNG", (pageWidth - logoWidth) / 2, currentY, logoWidth, logoHeight);
  }

  currentY += 200;

  // ==========================
  // Título
  // ==========================
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text("Relatório de Análise", pageWidth / 2, currentY, { align: "center" });
  currentY += 40;

  // ==========================
  // Caixa de dados do paciente (com sombra e borda)
  // ==========================
  const dataBoxHeight = 120;
  const dataBoxWidth = pageWidth - 2 * margin;
  doc.setDrawColor(200);
  doc.setFillColor(245, 245, 245);
  doc.roundedRect(margin, currentY, dataBoxWidth, dataBoxHeight, 8, 8, 'FD');

  const photoSize = 90;
  const photoX = margin + 10;
  const photoY = currentY + 15;

  if (patient.photo_url) {
    doc.addImage(patient.photo_url, "JPEG", photoX, photoY, photoSize, photoSize);
  }

  const textX = photoX + photoSize + 15;
  const textWidth = dataBoxWidth - photoSize - 35;
  const lineHeight = 18;
  let fieldY = photoY;

  const fields = [
    { label: "Nome:  ", value: patient.name },
    { label: "Data de Nascimento:   ", value: formatDate(patient.birth_date) },
    { label: "Médico Responsável:   ", value: doctor.name },
    { label: "Ângulo de Cobb:   ", value: `${cobbAngle.toFixed(1)}°` },
  ];

  fields.forEach((field) => {
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(field.label, textX, fieldY + 12);

    doc.setFont("helvetica", "normal");
    const valueLines = doc.splitTextToSize(field.value, textWidth - doc.getTextWidth(field.label));
    doc.text(valueLines, textX + doc.getTextWidth(field.label), fieldY + 12);

    fieldY += lineHeight * Math.max(1, valueLines.length);
  });

  currentY += dataBoxHeight + 20;

  // ==========================
  // Linha divisória
  // ==========================
  doc.setDrawColor(180);
  doc.setLineWidth(0.5);
  doc.line(margin, currentY, pageWidth - margin, currentY);
  currentY += 20;

  // ==========================
  // Imagem analisada proporcional
  // ==========================
  const maxWidth = pageWidth - 2 * margin - 20; // margem lateral
  const maxHeight = 280;

  const img = new Image();
  img.src = `data:image/png;base64,${analysedImageBase64}`;

  img.onload = () => {
    let width = img.width;
    let height = img.height;

    const aspectRatio = width / height;

    // Ajustar largura e altura mantendo proporção
    if (width > maxWidth) {
      width = maxWidth;
      height = width / aspectRatio;
    }
    if (height > maxHeight) {
      height = maxHeight;
      width = height * aspectRatio;
    }

    // Centralizar horizontalmente
    const imgX = (pageWidth - width) / 2;

    // Fundo cinza suave atrás da imagem
    doc.setDrawColor(200);
    doc.setFillColor(250, 250, 250);
    doc.roundedRect(imgX - 10, currentY - 10, width + 20, height + 20, 5, 5, 'F');

    // Adicionar imagem
    doc.addImage(`data:image/png;base64,${analysedImageBase64}`, "PNG", imgX, currentY, width, height);
    currentY += height + 30;

    // ==========================
    // Disclaimer
    // ==========================
    doc.setFontSize(9);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(120);
    const disclaimer = "Este relatório apresenta a análise realizada por IA. A interpretação médica profissional é indispensável para diagnóstico e tratamento.";
    const disclaimerLines = doc.splitTextToSize(disclaimer, pageWidth - 2 * margin);
    doc.text(disclaimerLines, margin, currentY);
    currentY += disclaimerLines.length * 12 + 20;

    // ==========================
    // Rodapé
    // ==========================
    doc.setFontSize(8);
    doc.setTextColor(100);
    doc.setFont("helvetica", "normal");
    doc.text("Ortho AI - Sistema de Análise de Imagens de Raio-X", pageWidth / 2, pageHeight - 25, { align: "center" });

    // ==========================
    // Salvar arquivo
    // ==========================
    const fileName = `relatorio_${patient.name.toLowerCase().replace(/\s+/g, "_")}.pdf`;
    doc.save(fileName);
  };
};

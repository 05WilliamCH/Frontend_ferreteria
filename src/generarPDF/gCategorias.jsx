import jsPDF from "jspdf";
import "jspdf-autotable";
import PropTypes from "prop-types"; // Agrega esta línea
import React from "react";

const PDFGenerator = ({ data }) => {
  const generatePDF = () => {
    const doc = new jsPDF();
    let contador = 0;

    // Agrega una imagen de encabezado
    const img = new Image();
    img.src = "https://i.imgur.com/A0QAX8x.jpeg"; // Reemplaza con la URL de tu imagen de encabezado
    doc.addImage(img, "JPEG", 13, 10, 30, 30); // Ajusta las coordenadas y el tamaño de la imagen

    // Agrega un título

    doc.setFontSize(18);
    doc.text("Ferreteria El Manantial", 77, 30);
    doc.text("Categorias registradas", 77, 40); // Ajusta las coordenadas y el tamaño del título

    // Agregar la fecha
    doc.setFontSize(12);
    const today = new Date();
    const date = `${today.getDate()}/${
      today.getMonth() + 1
    }/${today.getFullYear()}`;
    doc.text(`Fecha de Generación: ${date}`, 130, 15);

    // Define las columnas de la tabla
    const tableColumn = [
      "No.",
      "Categoria",
     
    ];
    const tableRows = [];

    data.forEach((item) => {
      const rowData = [
        ++contador,
        item.categoria,
     
      ];
      tableRows.push(rowData);
    });

    // Dibuja la tabla
    doc.autoTable({
      startY: 50, // Ajusta la posición vertical de la tabla
      head: [tableColumn],
      body: tableRows,
    });

    // Guarda el PDF o ábrelo en una nueva ventana
    // window.open(doc.output("bloburl"), "_blank");
    window.open(
      doc.save(`Proveedores${generatePDF.data}.pdf`).output("bloburl"),
      "_blank"
    );
    // window.open(doc.save(`Proveedores${generatePDF.data}.pdf`));
  };

  return (
    <div>
      <button style={{ cursor: "pointer" }}>
        <span onClick={generatePDF} className="material-symbols-outlined">
          print
        </span>
      </button>
    </div>
  );
};

PDFGenerator.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      contador: PropTypes.number,
      categoria: PropTypes.string,
     
      // Define más validaciones según la estructura de cada elemento en 'data' si es necesario
    })
  ),
};

export default PDFGenerator;

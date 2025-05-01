import React from "react";

const MedicamentoCard = ({ med, conjuntoKey, medKey, pesoPte }) => {
  let rataMin, rataMax; // Verifica que los valores de entrada sean válidos

  if (!pesoPte || pesoPte <= 0) {
    console.error("Peso del paciente no válido.");
    rataMin = 0;
    rataMax = 0;
  } else if (!med.k || med.k <= 0) {
    console.error("Valor de 'k' no válido.");
    rataMin = 0;
    rataMax = 0;
  } else {
    // Realiza los cálculos según el conjunto
    switch (conjuntoKey) {
      case "anestesicos": // Fórmula especial para REMIFENTANIL
        if (medKey === "remifentanil") {
          rataMin = (med.dosisMin * pesoPte * 60) / med.k;
          rataMax = (med.dosisMax * pesoPte * 60) / med.k;
        } // Fórmula especial para KETAMINA
        else if (medKey === "ketamina") {
          rataMin = (((med.dosisMin * pesoPte) / 1000) * 60) / med.k;
          rataMax = (((med.dosisMax * pesoPte) / 1000) * 60) / med.k;
        } // Fórmula estándar para otros anestésicos
        else {
          rataMin = (med.dosisMin * pesoPte) / med.k;
          rataMax = (med.dosisMax * pesoPte) / med.k;
        }
        break;
      case "bnm":
        if (medKey === "cisatracurio") {
          rataMin = (((med.dosisMin * pesoPte) / 1000) * 60) / med.k;
          rataMax = (((med.dosisMax * pesoPte) / 1000) * 60) / med.k;
        } else {
          rataMin = (med.dosisMin * pesoPte) / med.k;
          rataMax = (med.dosisMax * pesoPte) / med.k;
        }
        break;
      case "vasoconstrictorinotropico":
        if (medKey === "vasopresina") {
          rataMin = (med.dosisMin / med.k) * 60;
          rataMax = (med.dosisMax / med.k) * 60;
        } else if (medKey === "dobutamina") {
          rataMin = (((med.dosisMin * pesoPte) / 1000) * 60) / med.k;
          rataMax = (((med.dosisMax * pesoPte) / 1000) * 60) / med.k;
        } else {
          rataMin = (med.dosisMin * pesoPte * 60) / med.k;
          rataMax = (med.dosisMax * pesoPte * 60) / med.k;
        }
        break;
      case "catecolaminas":
        rataMin = (med.dosisMin / med.k) * 60;
        rataMax = (med.dosisMax / med.k) * 60;
        break;
      case "antihipertensivosaccionrapida":
        if (medKey === "labetalol") {
          rataMin = (med.dosisMin * 60) / med.k;
          rataMax = (med.dosisMax * 60) / med.k;
        } else if (medKey === "nitroglicerina") {
          rataMin = (med.dosisMin / med.k) * 60;
          rataMax = (med.dosisMax / med.k) * 60;
        } else {
          rataMin = (med.dosisMin * pesoPte * 60) / med.k;
          rataMax = (med.dosisMax * pesoPte * 60) / med.k;
        }
        break;
      case "antiarritmicos":
        rataMin = (med.dosisMax / med.k) * 60;
        rataMax = (med.dosisMin / med.k) * 60;
        break;
      case "anticolinergicos":
        rataMin = (med.dosisMin * pesoPte) / med.k;
        rataMax = (med.dosisMax * pesoPte) / med.k;
        break;
      default:
        rataMin = 0;
        rataMax = 0;
    }
  } // Medicamentos específicos que usan toFixed(1)

  const medicamentosEspecificos = ["amiodarona", "atropinaorganofosforado"]; // Verifica si el medicamento actual es uno de los específicos

  const esMedicamentoEspecifico = medicamentosEspecificos.includes(medKey);

  // Construir la cadena de clases dinámicamente
  const cardClasses = `medicamento-card ${conjuntoKey || ''}`;

  return (
    <div className={cardClasses}> {/* Aplicar clases dinámicas */}
      {/* Se eliminó la clase 'card' y se reemplazó por 'medicamento-card' y la clase del conjunto */}
      <div className="medicamento-header"> {/* Añadido header para estructura */}
        <h2 className="medicamento-title">{med.nombre}</h2>
        {med.subtitulo && <p className="medicamento-subtitle">{med.subtitulo}</p>} {/* Opcional: Mostrar subtítulo si existe */}
      </div>
      <div className="medicamento-body"> {/* Añadido body para estructura */}
        {" "}
        <p>
          <strong>Rata Mínima:</strong> {" "}
          {esMedicamentoEspecifico ? rataMin.toFixed(1) : rataMin.toFixed()}{" "}
          {med.unidad}{" "}
        </p>
        {" "}
        <p>
          <strong>Rata Máxima:</strong> {" "}
          {esMedicamentoEspecifico ? rataMax.toFixed(1) : rataMax.toFixed()}{" "}
          {med.unidad}{" "}
        </p>
        {" "}
      </div>
      {/* Mostrar precauciones si existen */}
      {med.precaucion && (
        <div className="medicamento-warning">
          <p className="medicamento-warning-text">Precaución: {med.precaucion}</p>
        </div>
      )}
    </div>
  );
};

export default MedicamentoCard;



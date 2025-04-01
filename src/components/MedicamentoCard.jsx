import React from 'react';

const MedicamentoCard = ({ med, conjuntoKey, medKey, pesoPte }) => {
  let rataMin, rataMax;

  // Verifica que los valores de entrada sean válidos
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
      case 'anestesicos':
        // Fórmula especial para REMIFENTANIL
        if (medKey === 'remifentanil') {
          rataMin = ((med.dosisMin * pesoPte) * 60) / med.k;
          rataMax = ((med.dosisMax * pesoPte) * 60) / med.k;
        } 
        // Fórmula especial para KETAMINA
        else if (medKey === 'ketamina') {
          rataMin = (((med.dosisMin * pesoPte) / 1000) * 60) / med.k;
          rataMax = (((med.dosisMax * pesoPte) / 1000) * 60) / med.k;
        }
        // Fórmula estándar para otros anestésicos
        else {
          rataMin = (med.dosisMin * pesoPte) / med.k;
          rataMax = (med.dosisMax * pesoPte) / med.k;
        }
        break;
      case 'bnm':
        if (medKey === 'cisatracurio') {
          rataMin = (((med.dosisMin * pesoPte) / 1000) * 60) / med.k;
          rataMax = (((med.dosisMax * pesoPte) / 1000) * 60) / med.k;
        }
        else {
          rataMin = (med.dosisMin * pesoPte) / med.k;
          rataMax = (med.dosisMax * pesoPte) / med.k;
        }
        break;
      case 'vasoconstrictorinotropico':
        if (medKey === 'vasopresina') {
          rataMin = (med.dosisMin / med.k) * 60;
          rataMax = (med.dosisMax / med.k) * 60;
          
        }
        else if (medKey === 'dobutamina') {
          rataMin = (((med.dosisMin * pesoPte) / 1000) * 60) / med.k;
          rataMax = (((med.dosisMax * pesoPte) / 1000) * 60) / med.k;
          }
        else {
          rataMin = ((med.dosisMin * pesoPte) * 60) / med.k;
          rataMax = ((med.dosisMax * pesoPte) * 60) / med.k;
        }
        break;
      case 'catecolaminas':
        rataMin = (med.dosisMin / med.k) * 60;
        rataMax = (med.dosisMax / med.k) * 60;
        break;
      case 'antihipertensivosaccionrapida':
        if (medKey === 'labetalol') {
          rataMin = (med.dosisMin * 60) / med.k;
          rataMax = (med.dosisMax * 60) / med.k;
        }
        else if (medKey === 'nitroglicerina') {
          rataMin = (med.dosisMin / med.k) * 60;
          rataMax = (med.dosisMax / med.k) * 60;
          }
        else {
          rataMin = ((med.dosisMin * pesoPte) * 60) / med.k;
          rataMax = ((med.dosisMax * pesoPte) * 60) / med.k;
        }
        break;
      case 'antiarritmicos':
          rataMin = (med.dosisMax / med.k) * 60;
          rataMax = (med.dosisMin / med.k) * 60;
          break;
      case 'anticolinergicos':
          rataMin = (med.dosisMin * pesoPte) / med.k;
          rataMax = (med.dosisMax * pesoPte) / med.k;
            break;   
      default:
        rataMin = 0;
        rataMax = 0;
    }
  }

  // Medicamentos específicos que usan toFixed(1)
  const medicamentosEspecificos = ["amiodarona", "atropinaorganofosforado"];

  // Verifica si el medicamento actual es uno de los específicos
  const esMedicamentoEspecifico = medicamentosEspecificos.includes(medKey);

  return (
    <div className="card">
      <h2>{med.nombre}</h2>
      <div className="result">
        <p>
          <strong>Rata Mínima:</strong>{" "}
          {esMedicamentoEspecifico ? rataMin.toFixed(1) : rataMin.toFixed()} {med.unidad}
        </p>
        <p>
          <strong>Rata Máxima:</strong>{" "}
          {esMedicamentoEspecifico ? rataMax.toFixed(1) : rataMax.toFixed()} {med.unidad}
        </p>

      </div>
    </div>
  );
};

export default MedicamentoCard;
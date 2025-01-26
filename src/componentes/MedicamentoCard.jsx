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
      case 'conjunto1':
        rataMin = (med.dosisMin * pesoPte) / med.k;
        rataMax = (med.dosisMax * pesoPte) / med.k;
        break;
      case 'conjunto2':
        rataMin = ((med.dosisMin * pesoPte) * 60) / med.k;
        rataMax = ((med.dosisMax * pesoPte) * 60) / med.k;
        break;
      case 'conjunto3':
        rataMin = (((med.dosisMin * pesoPte) / 1000) * 60) / med.k;
        rataMax = (((med.dosisMax * pesoPte) / 1000) * 60) / med.k;
        break;
      case 'conjunto4':
        rataMin = (med.dosisMin / med.k) * 60;
        rataMax = (med.dosisMax / med.k) * 60;
        break;
      case 'conjunto5':
        rataMin = (med.dosisMin * 60) / med.k;
        rataMax = (med.dosisMax * 60) / med.k;
        break;
      default:
        rataMin = 0;
        rataMax = 0;
    }
  }

  return (
    <div className="card">
      <h2>{med.nombre}</h2>
      <div className="result">
        <p>
          <strong>Rata Mínima:</strong> {rataMin.toFixed(1)} {med.unidad}
        </p>
        <p>
          <strong>Rata Máxima:</strong> {rataMax.toFixed(1)} {med.unidad}
        </p>
      </div>
    </div>
  );
};

export default MedicamentoCard;
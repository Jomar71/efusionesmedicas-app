import React, { useState } from 'react';
import MedicamentoCard from './componentes/MedicamentoCard';
import './styles.css';


// Crear el componente Footer como un componente separado


const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="footer-credits">
          <h4>Créditos y Reconocimientos</h4>
          <p><strong>Datos:</strong> Dr. Camilo Cortés Mora <em>Especialidad: Anestesiología</em></p>
          <p><strong>Modificado por:</strong> Dr. Andrés Mauricio Soto <em>Especialidad: Medicina Interna</em></p>
          <p><strong>Revisado por:</strong> Dr. Fabio Palomino Cabrera <em>Especialidad: Medicina General</em></p>
          <p><strong>Afiliación:</strong> SIMED - Sindicato de Médicos del Hospital San José</p>
          
          <p className="copyright">© {new Date().getFullYear()} jomar71</p>
        </div>
      </div>
    </div>
  );
};






const medicamentos = {
  conjunto1: {
    midazolam: { nombre: "Midazolam", dosisMin: 0.1, dosisMax: 0.3, unidad: 'mg/kg/h', k: 1 },
    propofol: { nombre: "Propofol", dosisMin: 1, dosisMax: 4, unidad: 'mg/kg/h', k: 10 },
    dexmedetomidina: { nombre: "Dexmedetomidina", dosisMin: 0.3, dosisMax: 1.2, unidad: 'mcg/kg/min', k: 4 },
    fentanil: { nombre: "Fentanil", dosisMin: 1, dosisMax: 3, unidad: 'mcg/kg/min', k: 10 },
    rocuronio: { nombre: "Rocuronio", dosisMin: 0.3, dosisMax: 0.6, unidad: 'mcg/kg/min', k: 1 },
    atropinaorganofosforado: { nombre: "Atropina Organofosforado", dosisMin: 0.02, dosisMax: 0.08, unidad: 'mcg/kg/min', k: 1 },
  },
  conjunto2: {
    remifentanil: { nombre: "Remifentanil", dosisMin: 0.05, dosisMax: 0.3, unidad: 'mcg/kg/min', k: 20 },
    norepinefrina: { nombre: "Norepinefrina", dosisMin: 0.05, dosisMax: 0.5, unidad: 'mg/kg/h', k: 64 },
    nitroprusiato: { nombre: "Nitroprusiato", dosisMin: 0.3, dosisMax: 2, unidad: 'mg/kg/h', k: 400 },
    milrinone: { nombre: "Milrinone", dosisMin: 0.375, dosisMax: 0.75, unidad: 'mcg/kg/min', k: 100 },
    levosimendan: { nombre: "Levosimendan", dosisMin: 0.05, dosisMax: 0.2, unidad: 'mcg/kg/min', k: 100 },
    levosimendan250: { nombre: "Levosimendan 250", dosisMin: 0.05, dosisMax: 0.2, unidad: 'mcg/kg/min', k: 50 },
  },
  conjunto3: {
    ketamina: { nombre: "Ketamina", dosisMin: 5, dosisMax: 16, unidad: 'mcg/kg/min', k: 2 },
    cisatracurio: { nombre: "Cisatracurio", dosisMin: 1, dosisMax: 3, unidad: 'mcg/kg/min', k: 1 },
    dobutamina: { nombre: "Dobutamina", dosisMin: 2.5, dosisMax: 10, unidad: 'mcg/kg/min', k: 2 },
  },
  conjunto4: {
    nitroglicerina: { nombre: "Nitroglicerina", dosisMin: 5, dosisMax: 200, unidad: 'mcg/kg/min', k: 400 },
    adrenalina2: { nombre: "Adrenalina**", dosisMin: 1, dosisMax: 10, unidad: 'mcg/kg/min', k: 4 },
    adrenalina: { nombre: "Adrenalina", dosisMin: 1, dosisMax: 10, unidad: 'mcg/kg/min', k: 10 },
    
  },
  conjunto5: {
    vasopresina: { nombre: "Vasopresina", dosisMin: 0.04, dosisMax: 0.06, unidad: 'mcg/kg/min', k: 0.2 },
    labetalol: { nombre: "Labetalol", dosisMin: 0.5, dosisMax: 2, unidad: 'mcg/kg/min', k: 1 },
  },
  conjunto6: {
    amiodarona: { nombre: "Amiodarona", dosisMin: 0.5, dosisMax: 1, unidad: 'mcg/kg/min', k: 4.2 },
  },
};


const App = () => {
  const [pesoPte, setPesoPte] = useState(0); // Estado temporal para el input
  const [pesoCalculado, setPesoCalculado] = useState(0); // Estado para el peso calculado

  const handleCalcular = () => {
    if (!pesoPte || pesoPte <= 0) {
      alert("Por favor, ingrese un peso de paciente válido.");
      return;
    }
    setPesoCalculado(pesoPte); // Actualiza el estado con el peso final
    console.log("Peso calculado:", pesoPte);
  };

  return (
    <div className="app-container">
      <div className="content-wrap">
        <h1>Calculadora Infusiones</h1>

        <div className="container5">
          <div className="card5">
            <h2>Báscula</h2>
            <div className="form-group">
              <label>Peso del Paciente (kg):</label>
              <input
                type="number"
                id="pesoPaciente"
                placeholder="Ingrese peso"
                value={pesoPte}
                onChange={(e) => {
                  setPesoPte(parseFloat(e.target.value)); // Actualiza el estado temporal
                  console.log("Peso actualizado:", e.target.value); // Depuración
                }}
              />
            </div>
            <button onClick={handleCalcular}>Calcular</button>
          </div>
        </div>

        <div className="card-container">
          {Object.entries(medicamentos).map(([conjuntoKey, conjunto]) =>
            Object.entries(conjunto).map(([medKey, med]) => (
              <MedicamentoCard
                key={`${conjuntoKey}-${medKey}`}
                med={med}
                conjuntoKey={conjuntoKey}
                medKey={medKey}
                pesoPte={pesoCalculado} // Pasa el peso calculado a las tarjetas
              />
            ))
          )}
        </div>
      </div>
      
      {/* Añadir el Footer */}
      <Footer />
    </div>
  );
};


export default App;
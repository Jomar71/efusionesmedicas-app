import React, { useState } from 'react';
import MedicamentoCard from './components/MedicamentoCard';
import Footer from './components/Footer';
import {
  anestesicos, antiarritmicos, anticolinergicos,
  antihipertensivosaccionrapida, bnm, catecolaminas, vasoconstrictorinotropico
} from './components/conjuntos';
import './styles.css';

const App = () => {
  const [pesoPte, setPesoPte] = useState(0);
  const [pesoCalculado, setPesoCalculado] = useState(0);

  const medicamentos = {
    anestesicos: anestesicos,
    antiarritmicos: antiarritmicos,
    anticolinergicos: anticolinergicos,
    antihipertensivosaccionrapida: antihipertensivosaccionrapida,
    bnm: bnm,
    catecolaminas: catecolaminas,
    vasoconstrictorinotropico: vasoconstrictorinotropico
  };

  const handleCalcular = () => {
    if (!pesoPte || pesoPte <= 0) {
      alert("Por favor, ingrese un peso de paciente válido.");
      return;
    }
    setPesoCalculado(pesoPte);
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
      <Footer /> {/* Añade esto al final */}
    </div>
  );
};


export default App;
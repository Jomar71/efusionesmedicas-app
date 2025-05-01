import React, { useState, useRef, useCallback, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./Navbar";
import MedicamentoCard from "./components/MedicamentoCard";
import Footer from "./components/Footer";
import {
  anestesicos,
  antiarritmicos,
  anticolinergicos,
  antihipertensivosaccionrapida,
  bnm,
  catecolaminas,
  vasoconstrictorinotropico,
} from "./components/conjuntos";
import "./styles.css";
import "./Navbar.css";
import "./Medicamentos.css";


const App = () => {
  const [pesoPte, setPesoPte] = useState("");
  const [pesoCalculado, setPesoCalculado] = useState(null);
  const [seccionActiva, setSeccionActiva] = useState("anestesicos");
  const [error, setError] = useState("");
  const sectionsRef = useRef({});
  const calculatorRef = useRef(null);

  // useEffect para scroll de báscula eliminado (manejado por CSS sticky)

  const gruposMedicamentos = [
    { id: "anestesicos", nombre: "Anestésicos" },
    { id: "antiarritmicos", nombre: "Antiarrítmicos" },
    { id: "anticolinergicos", nombre: "Anticolinérgicos" },
    { id: "antihipertensivosaccionrapida", nombre: "Antihipertensivos" },
    { id: "bnm", nombre: "BNM" },
    { id: "catecolaminas", nombre: "Catecolaminas" },
    { id: "vasoconstrictorinotropico", nombre: "Vasoconstrictores" },
  ];

  const medicamentos = {
    anestesicos,
    antiarritmicos,
    anticolinergicos,
    antihipertensivosaccionrapida,
    bnm,
    catecolaminas,
    vasoconstrictorinotropico,
  };

  const handleCalcular = useCallback((e) => {
    e.preventDefault();
    const peso = parseFloat(pesoPte);
    
    if (!peso || peso <= 0) {
      setError("Por favor, ingrese un peso válido mayor a 0");
      setPesoCalculado(null);
      return;
    }
    
    setError("");
    setPesoCalculado(peso);
    document.getElementById('pesoPaciente')?.focus();
  }, [pesoPte]);

  const handleSeccionChange = useCallback((seccion) => {
    setSeccionActiva(seccion);
    if (sectionsRef.current[seccion]) {
      setTimeout(() => {
        sectionsRef.current[seccion].scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    }
  }, []);

  const registerSection = useCallback((seccion, element) => {
    if (element) {
      sectionsRef.current[seccion] = element;
    }
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Navbar 
          onSeccionChange={handleSeccionChange} 
          seccionActiva={seccionActiva}
          gruposMedicamentos={gruposMedicamentos}
        />
        
        {/* Báscula fija con sticky positioning */}
        <div className="calculator-container" ref={calculatorRef}>
          <form onSubmit={handleCalcular} className="calculator-card">
            <h2>Báscula</h2>
            <div className="form-group">
              <label htmlFor="pesoPaciente">Peso del Paciente (kg):</label>
              <input
                type="number"
                id="pesoPaciente"
                placeholder="Ej: 70"
                value={pesoPte}
                onChange={(e) => setPesoPte(e.target.value)}
                min="0.1"
                step="0.1"
                className={error ? "input-error" : ""}
              />
              {error && <div className="error-message">{error}</div>}
              {pesoCalculado && (
                <div className="success-message">
                  Peso calculado: {pesoCalculado} kg
                </div>
              )}
            </div>
            <button type="submit">Calcular</button>
          </form>
        </div>
        
        <main className="main-content">
          {Object.entries(medicamentos).map(([conjuntoKey, conjunto]) => (
            <section
              key={conjuntoKey}
              id={conjuntoKey}
              className={`app-section ${seccionActiva === conjuntoKey ? "active" : ""}`}
              ref={(el) => registerSection(conjuntoKey, el)}
            >
              <div className="section-container">
                <h2 className="section-title">
                  {gruposMedicamentos.find(g => g.id === conjuntoKey)?.nombre}
                </h2>
                <div className="medicamentos-grid">
                  {Object.entries(conjunto).map(([medKey, med]) => (
                    <MedicamentoCard
                      key={`${conjuntoKey}-${medKey}`}
                      med={med}
                      conjuntoKey={conjuntoKey}
                      medKey={medKey}
                      pesoPte={pesoCalculado}
                    />
                  ))}
                </div>
              </div>
            </section>
          ))}
        </main>
        
        <Footer />
      </div>
    </Router>
  );
};

export default App;
import React from 'react';

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

export default Footer;
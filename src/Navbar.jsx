import React, { useState, useEffect } from 'react';
import './Navbar.css';


const Navbar = ({ onSeccionChange }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavClick = (seccion, e) => {
    e.preventDefault();
    onSeccionChange(seccion);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <a href="#calculadora" onClick={(e) => handleNavClick('calculadora', e)}>
            Infusiones Médicas
          </a>
        </div>

        <ul className="navbar-links">
          <li><a href="#anestesicos" onClick={(e) => handleNavClick('anestesicos', e)}>Anestésicos</a></li>
          <li><a href="#antiarritmicos" onClick={(e) => handleNavClick('antiarritmicos', e)}>Antiarrítmicos</a></li>
          <li><a href="#anticolinergicos" onClick={(e) => handleNavClick('anticolinergicos', e)}>Anticolinérgicos</a></li>
          <li><a href="#antihipertensivosaccionrapida" onClick={(e) => handleNavClick('antihipertensivosaccionrapida', e)}>Antihipertensivos</a></li>
          <li><a href="#bnm" onClick={(e) => handleNavClick('bnm', e)}>BNM</a></li>
          <li><a href="#catecolaminas" onClick={(e) => handleNavClick('catecolaminas', e)}>Catecolaminas</a></li>
          <li><a href="#vasoconstrictorinotropico" onClick={(e) => handleNavClick('vasoconstrictorinotropico', e)}>Vasoconstrictores</a></li>
        </ul>

        <button 
          className="menu-toggle" 
          onClick={toggleMobileMenu}
          aria-label="Menú"
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        <ul>
          
          <li><a href="#anestesicos" onClick={(e) => handleNavClick('anestesicos', e)}>Anestésicos</a></li>
          <li><a href="#antiarritmicos" onClick={(e) => handleNavClick('antiarritmicos', e)}>Antiarrítmicos</a></li>
          <li><a href="#anticolinergicos" onClick={(e) => handleNavClick('anticolinergicos', e)}>Anticolinérgicos</a></li>
          <li><a href="#antihipertensivosaccionrapida" onClick={(e) => handleNavClick('antihipertensivosaccionrapida', e)}>Antihipertensivos</a></li>
          <li><a href="#bnm" onClick={(e) => handleNavClick('bnm', e)}>BNM</a></li>
          <li><a href="#catecolaminas" onClick={(e) => handleNavClick('catecolaminas', e)}>Catecolaminas</a></li>
          <li><a href="#vasoconstrictorinotropico" onClick={(e) => handleNavClick('vasoconstrictorinotropico', e)}>Vasoconstrictores</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
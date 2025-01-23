import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const page = useLocation();
  const mainPage = page.pathname === "/"; 

  const goHome = () => {
    navigate('/');
  };

  return (
    
      <header className="header">
        <section>
          <section className="header-title">

            <h1>
              {mainPage ? "Salapalooza Schedules" : "Scheduling Details"}
            </h1>
        
          </section>
        

        {!mainPage && (
          <button onClick={goHome} className="home-btn">
            Go Home
          </button>
        )}
        </section>
      </header>
    
  );
};

export default Header;
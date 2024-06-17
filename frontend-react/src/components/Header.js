import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Header.css';

const Header = ({ auth, handleLogout }) => {
  const navigate = useNavigate();

  const onLogoutClick = () => {
    handleLogout();
    navigate('/login');
  };

  return (
    <header className="header">
      <nav>
        <Link to="/dashboard" className="nav-button">Главная</Link>
        <Link to="/schedule" className="nav-button">Афиша</Link>
        <Link to="/contacts" className="nav-button">Контакты</Link>
        {auth && <button onClick={onLogoutClick} className="nav-button">Выйти</button>}
      </nav>
    </header>
  );
};

export default Header;

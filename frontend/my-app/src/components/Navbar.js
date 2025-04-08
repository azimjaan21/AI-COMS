import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRedo, FaGlobe, FaCog, FaBars } from "react-icons/fa";
import "../assets/components/_navbar.scss";
import { useTranslation } from "react-i18next";


const Navbar = ({ onToggleSidebar, onRefreshMain, activePage }) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const handleLanguageToggle = () => {
    const newLang = i18n.language === "en" ? "kr" : "en";
    i18n.changeLanguage(newLang);
  };

  const handleSettingsClick = () => {
    navigate("/settings");
  };

  return (
    <nav className="navbar px-4">
      {/* Menu button - visible only on small screens */}
      <button className="btn d-md-none me-3 menu-toggle" onClick={onToggleSidebar}>
        <FaBars />
      </button>

      <span className="navbar-title">{activePage}</span>
      <h1 className="navbar-logo mx-auto">Factory Monitoring System</h1>

      <div className="navbar-icons d-flex gap-3">
        <FaRedo className="icon" onClick={onRefreshMain} title="Refresh content" />
        <FaGlobe className="icon" onClick={handleLanguageToggle} title="Toggle Language" />
        <FaCog className="icon" onClick={handleSettingsClick} title="Settings" />
      </div>
    </nav>
  );
};

export default Navbar;

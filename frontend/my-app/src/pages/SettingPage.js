// SettingsPage.js
import React from "react";

const SettingsPage = ({ isDarkMode, setIsDarkMode }) => {
  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">Settings</h2>
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          id="darkModeToggle"
          checked={isDarkMode}
          onChange={handleToggle}
        />
        <label className="form-check-label" htmlFor="darkModeToggle">
          Enable Dark Mode
        </label>
      </div>
    </div>
  );
};

export default SettingsPage;

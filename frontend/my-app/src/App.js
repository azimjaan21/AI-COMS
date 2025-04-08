// App.js
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import "./assets/styles.scss";

// Components
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import SettingsPage from "./pages/SettingPage";

// Layout component (main wrapper with navbar + sidebar)
function AppLayout({ isAuthenticated, setIsAuthenticated, isDarkMode, setIsDarkMode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("Home");
  const [refreshKey, setRefreshKey] = useState(0);

  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  const handleRefreshMain = () => {
    setRefreshKey((prev) => prev + 1);
  };

  if (!isAuthenticated && !isLoginPage) {
    return <Navigate to="/login" />;
  }

  return (
    <div className={`d-flex ${isDarkMode ? "dark-mode" : ""}`}>
      {/* Sidebar */}
      {!isLoginPage && (
        <div className={`sidebar-wrapper ${sidebarOpen ? "d-block" : "d-none"} d-md-block`}>
          <Sidebar toggleSidebar={setSidebarOpen} setActivePage={setActivePage} />
        </div>
      )}

      {/* Overlay for mobile */}
      {sidebarOpen && !isLoginPage && (
        <div className="overlay" onClick={() => setSidebarOpen(false)} />
      )}

      <div className="flex-grow-1">
        {/* Navbar */}
        {!isLoginPage && (
          <Navbar
            onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            onRefreshMain={handleRefreshMain}
            activePage={activePage}
          />
        )}

        <div className="content-wrapper">
          <Routes>
            <Route path="/" element={<Home key={refreshKey} />} />
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route
              path="/settings"
              element={<SettingsPage isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

// Root component of the app
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // dark mode state

  return (
    <Router>
      <AppLayout
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />
    </Router>
  );
}

export default App;

import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import Users from "./Users/Users";
import Moderation from "./Moderation/Moderation";
import Reports from "./Reports/Reports";
import { getUsernameFromToken } from "../../protected/ProtectedRoute";
import Logo from "../../assets/Logo.png"
import "./AdminPanel.css";

interface AdminPanelProps {
  defaultSection?: string;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ defaultSection = "Dashboard" }) => {
  const [selectedSection, setSelectedSection] = useState<string>(defaultSection);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [ theme, setTheme ] = useState<string>('light');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const renderContent = (theme: string) => {
    switch (selectedSection) {
      case "Dashboard":
        return <Dashboard themeProvided={theme} />;
      case "Users":
        return <Users themeProvided={theme} />;
      case "Moderation":
        return <Moderation themeProvided={theme} />;
      case "Reports":
        return <Reports themeProvided={theme} />;
      default:
        return <div><h1>Welcome</h1><p>Select a section from the sidebar.</p></div>;
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
      if (showSettings && modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setShowSettings(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSettings]);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    navigate("/");
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const openSettings = () => {
    setDropdownOpen(false); // Close the dropdown
    setShowSettings(true); // Open the modal
  };

  const closeSettings = () => {
    setShowSettings(false);
  };

  return (
    <div className="admin-panel-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <img src={Logo} alt="Logo" />
        </div>
        <nav className="sidebar-menu">
          <ul>
            {["Dashboard", "Users", "Moderation", "Reports"].map((item) => (
              <li
                key={item}
                className={selectedSection === item ? "active" : ""}
                onClick={() => {
                  setSelectedSection(item); 
                  navigate(`/admin/${item.toLowerCase()}`);
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        {/* Account Info */}
        <header className={theme === 'dark' ? "account-info-dark" : "account-info-light" }>
          <div className={theme === 'dark' ? "account-info-left-dark" : "account-info-left-light"}>ADMIN PANEL</div>
          <div
            className={theme === 'dark' ? "account-info-right-dark" : "account-info-right-light"}
            onClick={() => setDropdownOpen(!dropdownOpen)}
            ref={dropdownRef}
          >
            <span>{getUsernameFromToken(localStorage.getItem("jwt") || "")}</span>
            <img
              src="https://via.placeholder.com/40"
              alt="Profile"
              className="profile-picture"
            />
            {dropdownOpen && (
              <div className={theme === 'dark' ? "dropdown-menu-dark" : "dropdown-menu-light"}>
                <div className={theme === 'dark' ? "dropdown-item-dark" : "dropdown-item-light"} onClick={openSettings}>
                  Settings
                </div>
                <div className={theme === 'dark' ? "dropdown-item-dark" : "dropdown-item-light"} onClick={handleLogout}>
                  Log Out
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Dynamic Content */}
        <div className={theme === 'dark' ? "content-area-dark" : "content-area-light"}>{renderContent(theme)}</div>

        {/* Account Settings Modal */}
        {showSettings && (
          <div className="modal-backdrop">
            <div className="modal" ref={modalRef}>
              <div className="modal-header">
                <h2>Settings</h2>
                <button className="close-button" onClick={closeSettings}>
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <div className="theme-switcher">
                    <input
                        type="checkbox"
                        checked={theme === "dark"}
                        onChange={toggleTheme}
                    />
                    <span>Dark Mode</span>
                </div>
                <label>
                  Username:
                  <input type="text" placeholder="John Doe" />
                </label>
                <label>
                  Email:
                  <input type="email" placeholder="example@example.com" />
                </label>
                <label>
                  Password:
                  <input type="password" placeholder="••••••••" />
                </label>
                <button className="save-button">Save Changes</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;

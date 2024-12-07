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
  const [showAccountSettings, setShowAccountSettings] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const renderContent = () => {
    switch (selectedSection) {
      case "Dashboard":
        return <Dashboard />;
      case "Authors":
        return <Users />;
      case "Moderation":
        return <Moderation />;
      case "Reports":
        return <Reports />;
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
      if (showAccountSettings && modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setShowAccountSettings(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showAccountSettings]);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    navigate("/");
  };

  const openAccountSettings = () => {
    setDropdownOpen(false); // Close the dropdown
    setShowAccountSettings(true); // Open the modal
  };

  const closeAccountSettings = () => {
    setShowAccountSettings(false);
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
            {["Dashboard", "Authors", "Moderation", "Reports"].map((item) => (
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
        <header className="account-info-dark">
          <div className="account-info-left-dark">ADMIN PANEL</div>
          <div
            className="account-info-right-dark"
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
              <div className="dropdown-menu">
                <div className="dropdown-item" onClick={openAccountSettings}>
                  Account Settings
                </div>
                <div className="dropdown-item" onClick={handleLogout}>
                  Log Out
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="content-area-dark">{renderContent()}</div>

        {/* Account Settings Modal */}
        {showAccountSettings && (
          <div className="modal-backdrop">
            <div className="modal" ref={modalRef}>
              <div className="modal-header">
                <h2>Account Settings</h2>
                <button className="close-button" onClick={closeAccountSettings}>
                  &times;
                </button>
              </div>
              <div className="modal-body">
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

import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import Users from "./Users/Users";
import Moderation from "./Moderation/Moderation";
import Reports from "./Reports/Reports";
import "./AdminPanel.css";

interface AdminPanelProps {
  defaultSection?: string;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ defaultSection = "Dashboard" }) => {
  const [selectedSection, setSelectedSection] = useState<string>(defaultSection);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
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
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    navigate("/");
  };

  return (
    <div className="admin-panel-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">Admin Panel</div>
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
        <header className="account-info">
          <div className="account-info-left"></div>
          <div
            className="account-info-right"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            ref={dropdownRef}
          >
            <span>Admin Name</span>
            <img
              src="https://via.placeholder.com/40"
              alt="Profile"
              className="profile-picture"
            />
            {dropdownOpen && (
              <div className="dropdown-menu">
                <div className="dropdown-item" onClick={() => navigate("/account-settings")}>
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
        <div className="content-area">{renderContent()}</div>
      </div>
    </div>
  );
};

export default AdminPanel;

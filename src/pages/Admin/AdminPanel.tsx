import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import Authors from "./Authors/Authors";
import Moderation from "./Moderation/Moderation";
import Reports from "./Reports/Reports";
import Settings from "./Settings/Settings";
import "./AdminPanel.css";

interface AdminPanelProps {
  defaultSection?: string;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ defaultSection = "Dashboard" }) => {
  const [selectedSection, setSelectedSection] = useState<string>(defaultSection);
  const navigate = useNavigate();

  const renderContent = () => {
    switch (selectedSection) {
      case "Dashboard":
        return (
          <Dashboard />
        );
        case "Authors":
          return (
            <Authors />
          );        
      case "Moderation":
        return (
          <Moderation />
        );
      case "Reports":
        return (
          <Reports />
        );
      case "Settings":
        return (
          <Settings />
        );
      default:
        return <div><h1>Welcome</h1><p>Select a section from the sidebar.</p></div>;
    }
  };


  return (
    <div className="admin-panel-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">Admin Panel</div>
        <nav className="sidebar-menu">
          <ul>
            {["Dashboard", "Authors", "Moderation", "Reports", "Settings"].map((item) => (
              <li
                key={item}
                className={selectedSection === item ? "active" : ""}
                onClick={() => {
                    setSelectedSection(item); 
                    navigate(`/admin/${item.toLowerCase()}`);
                  }
                }
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
          <div className="account-info-left">Welcome, Admin</div>
          <div className="account-info-right">
            <span>Admin Name</span>
            <img
              src="https://via.placeholder.com/40"
              alt="Profile"
              className="profile-picture"
            />
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="content-area">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;

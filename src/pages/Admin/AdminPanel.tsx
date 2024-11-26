import React, { useState } from "react";
import "./AdminPanel.css";

const AdminPanel: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<string>("Dashboard");

  // Render content dynamically based on the selected section
  const renderContent = () => {
    switch (selectedSection) {
      case "Dashboard":
        return (
          <div>
            <h1>Dashboard</h1>
            <p>Overview of authors, posts, and flagged content.</p>
            <ul>
              <li>Total Authors: 120</li>
              <li>Posts Published Today: 45</li>
              <li>Flagged Posts: 3</li>
            </ul>
          </div>
        );
      case "Authors":
        return (
          <div>
            <h1>Author Management</h1>
            <p>View and manage all authors on the platform.</p>
            <ul>
              <li>Author A (Posts: 10, Status: Active)</li>
              <li>Author B (Posts: 5, Status: Suspended)</li>
              <li>Author C (Posts: 20, Status: Active)</li>
            </ul>
          </div>
        );
      case "Moderation":
        return (
          <div>
            <h1>Content Moderation</h1>
            <p>Approve, reject, or edit submitted posts.</p>
            <ul>
              <li>Post 1: *Flagged for inappropriate content*</li>
              <li>Post 2: *Awaiting approval*</li>
              <li>Post 3: *Approved*</li>
            </ul>
          </div>
        );
      case "Reports":
        return (
          <div>
            <h1>Reports and Feedback</h1>
            <p>Manage user-reported content and feedback.</p>
            <ul>
              <li>Report 1: *Spam in comments*</li>
              <li>Report 2: *Plagiarism detected*</li>
            </ul>
          </div>
        );
      case "Settings":
        return (
          <div>
            <h1>Platform Settings</h1>
            <p>Manage platform-wide configurations and guidelines.</p>
          </div>
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
                onClick={() => setSelectedSection(item)}
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

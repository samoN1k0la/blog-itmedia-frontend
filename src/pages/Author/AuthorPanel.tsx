import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthorDashboard from "./Dashboard/AuthorDashboard";
import AuthorPosts from "./Posts/AuthorPosts";
import AuthorProfile from "./Profile/AuthorProfile";
import CreatePost from "./CreatePost/CreatePost";
import Logo from "../../assets/Logo.png";
import "./AuthorPanel.css";

interface AuthorPanelProps {
  defaultSection?: string;
}

const AuthorPanel: React.FC<AuthorPanelProps> = ({ defaultSection = "Dashboard" }) => {
  const [selectedSection, setSelectedSection] = useState<string>(defaultSection);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [theme, setTheme] = useState<string>("light");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const renderContent = (theme: string) => {
    switch (selectedSection) {
      case "Dashboard":
        return <AuthorDashboard themeProvided={theme} />;
      case "Posts":
        return <AuthorPosts themeProvided={theme} />;
      case "Profile":
        return <AuthorProfile themeProvided={theme} />;
      case "Create":
        return <CreatePost themeProvided={theme} />;
      default:
        return (
          <div>
            <h1>Welcome</h1>
            <p>Select a section from the sidebar.</p>
          </div>
        );
    }
  };

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

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    navigate("/");
  };

  return (
    <div className="author-panel-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <img src={Logo} alt="Logo" />
        </div>
        <nav className="sidebar-menu">
          <ul>
            {["Dashboard", "Posts", "Profile", "Create"].map((item) => (
              <li
                key={item}
                className={selectedSection === item ? "active" : ""}
                onClick={() => {
                  setSelectedSection(item);
                  navigate(`/author/${item.toLowerCase()}`);
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
        <header className={theme === "dark" ? "account-info-dark" : "account-info-light"}>
          <div className={theme === "dark" ? "account-info-left-dark" : "account-info-left-light"}>AUTHOR PANEL</div>
          <div
            className={theme === "dark" ? "account-info-right-dark" : "account-info-right-light"}
            onClick={() => setDropdownOpen(!dropdownOpen)}
            ref={dropdownRef}
          >
            <span>Author</span>
            <img
              src="https://via.placeholder.com/40"
              alt="Profile"
              className="profile-picture"
            />
            {dropdownOpen && (
              <div className={theme === "dark" ? "dropdown-menu-dark" : "dropdown-menu-light"}>
                <div className="dropdown-item" onClick={toggleTheme}>Toggle Theme</div>
                <div className="dropdown-item" onClick={handleLogout}>Log Out</div>
              </div>
            )}
          </div>
        </header>

        {/* Dynamic Content */}
        <div className={theme === "dark" ? "content-area-dark" : "content-area-light"}>{renderContent(theme)}</div>
      </div>
    </div>
  );
};

export default AuthorPanel;

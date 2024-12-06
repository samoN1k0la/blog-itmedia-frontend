import React from "react";
import "./AuthorPanel.css";

const AuthorPanel: React.FC = () => {
    return (
        <div className="author-panel-container">
            <div className="author-panel-content">
                <h1 className="author-panel-title">Coming Soon</h1>
                <p className="author-panel-message">Our developers are currently working hard to bring you this feature. Please check back soon!</p>
                <a href="/" className="author-panel-button">Go Back Home</a>
            </div>
        </div>
    );
};

export default AuthorPanel;

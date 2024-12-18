import React, { useState, useEffect } from "react";
import "./AuthorDashboard.css";

type ComponentProps = {
    themeProvided: string;
};

const AuthorDashboard: React.FC<ComponentProps> = ({ themeProvided }) => {
    const [theme, setTheme] = useState<string>(themeProvided);

    useEffect(() => {
        setTheme(themeProvided);
    }, [themeProvided]);

    return (
        <div className="author-dashboard">
            <h1>Author Dashboard</h1>
            <p>Welcome back! Here's an overview of your activity:</p>
            <div className="dashboard-stats">
                <div className="stat-box">
                    <h2>Published Posts</h2>
                    <p>12</p>
                </div>
                <div className="stat-box">
                    <h2>Drafts</h2>
                    <p>5</p>
                </div>
                <div className="stat-box">
                    <h2>Comments</h2>
                    <p>34</p>
                </div>
            </div>
        </div>
    );
};

export default AuthorDashboard;

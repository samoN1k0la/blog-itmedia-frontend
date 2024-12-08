import React, { useState, useEffect } from "react";

type ComponentProps = {
  themeProvided: string;
};

const Dashboard: React.FC<ComponentProps> = ({ themeProvided }) => {
  const [theme, setTheme] = useState<string>(themeProvided);
    
  useEffect(() => {
    setTheme(themeProvided);
  }, [themeProvided]);

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
};

export default Dashboard;

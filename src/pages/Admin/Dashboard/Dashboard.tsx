import React from "react";

const Dashboard: React.FC = () => {
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

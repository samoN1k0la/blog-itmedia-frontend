import React from "react";

const Authors: React.FC = () => {
    return (
        <div className="author-management">
            <h1>Author Management</h1>
            <p>View and manage all authors on the platform.</p>
            <table className="author-table">
            <thead>
                <tr>
                <th>Author Name</th>
                <th>Posts</th>
                <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>Author A</td>
                <td>10</td>
                <td>Active</td>
                </tr>
                <tr>
                <td>Author B</td>
                <td>5</td>
                <td>Suspended</td>
                </tr>
                <tr>
                <td>Author C</td>
                <td>20</td>
                <td>Active</td>
                </tr>
            </tbody>
            </table>
        </div>
    );  
};

export default Authors;

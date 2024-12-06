import React, { useState } from "react";
import "./Users.css";

const Users: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    const authors = [
        { name: "Author A", posts: 10, status: "Active" },
        { name: "Author B", posts: 5, status: "Suspended" },
        { name: "Author C", posts: 20, status: "Active" },
    ];

    const filteredAuthors = authors.filter((author) => {
        const matchesSearch = author.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = statusFilter === "All" || author.status === statusFilter;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="user-management">
            <h1>User Management</h1>
            <p>View and manage all users on the platform.</p>

            {/* Search and Filter Controls */}
            <div className="filters">
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="filter-select"
                >
                    <option value="All">All Statuses</option>
                    <option value="Active">Active</option>
                    <option value="Suspended">Suspended</option>
                </select>
            </div>

            {/* Authors Table */}
            <table className="user-table">
                <thead>
                    <tr>
                        <th>Author Name</th>
                        <th>Posts</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAuthors.map((author, index) => (
                        <tr key={index}>
                            <td>{author.name}</td>
                            <td>{author.posts}</td>
                            <td
                                className={
                                    author.status === "Active"
                                        ? "status-active"
                                        : "status-suspended"
                                }
                            >
                                {author.status}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Users;

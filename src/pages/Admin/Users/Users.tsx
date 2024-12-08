import React, { useState, useEffect } from "react";
import "./Users.css";

interface Author {
    name: string;
    posts: number;
    status: string;
}

type ComponentProps = {
    themeProvided: string;
  };

const Users: React.FC<ComponentProps> = ({ themeProvided }) => {
    const [theme, setTheme] = useState<string>(themeProvided);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [authors, setAuthors] = useState<Author[]>([
        { name: "Nikola Lukić", posts: 10, status: "Active" },
        { name: "Maja Petrović", posts: 5, status: "Suspended" },
        { name: "Aleksandar Marković", posts: 20, status: "Active" },
        { name: "Ivana Savić", posts: 15, status: "Suspended" },
        { name: "Jovan Ilić", posts: 8, status: "Active" },
        { name: "Marija Kostić", posts: 25, status: "Active" },
        { name: "Stefan Nikolić", posts: 12, status: "Suspended" },
        { name: "Ana Stojanović", posts: 30, status: "Active" },
        { name: "Vuk Račić", posts: 3, status: "Suspended" },
        { name: "Teodora Babić", posts: 18, status: "Active" },
    ]);    
    const [sortConfig, setSortConfig] = useState<{ key: keyof Author; direction: string } | null>(null);

    const handleSort = (key: keyof Author) => {
        let direction = "ascending";
        if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
            direction = "descending";
        }
        const sortedAuthors = [...authors].sort((a, b) => {
            if (a[key] < b[key]) {
                return direction === "ascending" ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return direction === "ascending" ? 1 : -1;
            }
            return 0;
        });
        setAuthors(sortedAuthors);
        setSortConfig({ key, direction });
    };

    const filteredAuthors = authors.filter((author) => {
        const matchesSearch = author.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = statusFilter === "All" || author.status === statusFilter;
        return matchesSearch && matchesFilter;
    });

    useEffect(() => {
        setTheme(themeProvided);
    }, [themeProvided]);

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
                    className={theme === "dark" ? "search-input-dark" : "search-input-light"}
                />
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className={theme === "dark" ? "filter-select-dark" : "filter-select-light"}
                >
                    <option value="All">All Statuses</option>
                    <option value="Active">Active</option>
                    <option value="Suspended">Suspended</option>
                </select>
            </div>

            {/* Authors Table */}
            <table className={theme === "dark" ? "user-table-dark" : "user-table-light"}>
                <thead>
                    <tr>
                        <th onClick={() => handleSort("name")}>
                            Author Name {sortConfig?.key === "name" ? (sortConfig.direction === "ascending" ? "↑" : "↓") : ""}
                        </th>
                        <th onClick={() => handleSort("posts")}>
                            Posts {sortConfig?.key === "posts" ? (sortConfig.direction === "ascending" ? "↑" : "↓") : ""}
                        </th>
                        <th onClick={() => handleSort("status")}>
                            Status {sortConfig?.key === "status" ? (sortConfig.direction === "ascending" ? "↑" : "↓") : ""}
                        </th>
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

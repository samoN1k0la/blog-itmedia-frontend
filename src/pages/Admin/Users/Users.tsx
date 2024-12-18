import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Users.css";

interface Author {
    id: number;
    username: string;
    email: string;
    createdAt: string;
    role: string;
}

type ComponentProps = {
    themeProvided: string;
};

const Users: React.FC<ComponentProps> = ({ themeProvided }) => {
    const [theme, setTheme] = useState<string>(themeProvided);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [authors, setAuthors] = useState<Author[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalUsers, setTotalUsers] = useState<number>(0);
    const [limit] = useState<number>(3); // Number of users per page
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchAuthors = async (page: number) => {
        setIsLoading(true);
        const token = localStorage.getItem("jwt"); // Retrieve the JWT token from localStorage
        if (!token) {
            console.error("JWT token not found in localStorage.");
            alert("You are not authorized. Please log in.");
            window.location.href = "/login"; // Redirect to login if no token
            return;
        }
    
        try {
            const usersBackendRoute = `${process.env.REACT_APP_BACKEND_URL}/users`
            const response = await axios.get(usersBackendRoute, {
                params: { page, limit }, // Pass page and limit as query parameters
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the Authorization header
                },
            });
    
            setAuthors(response.data.users);
            setTotalUsers(response.data.total); // Total number of users from the backend
        } catch (error: any) {
            if (error.response) {
                // Handle specific HTTP errors
                if (error.response.status === 401) {
                    alert("Session expired. Please log in again.");
                    window.location.href = "/login"; // Redirect to login if unauthorized
                } else {
                    console.error(`Error fetching users: ${error.response.data.message || error.message}`);
                    alert(`Error: ${error.response.data.message || "Failed to fetch authors."}`);
                }
            } else {
                console.error("Error fetching users:", error.message);
                alert("An error occurred while fetching data. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };
    

    const totalPages = Math.ceil(totalUsers / limit);

    useEffect(() => {
        fetchAuthors(currentPage);
    }, [currentPage]);

    useEffect(() => {
        setTheme(themeProvided);
    }, [themeProvided]);

    const filteredAuthors = authors.filter((author) => {
        const matchesSearch = author.username.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = statusFilter === "All" || author.role === statusFilter.toLowerCase();
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
                    placeholder="Search by username..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={theme === "dark" ? "search-input-dark" : "search-input-light"}
                />
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className={theme === "dark" ? "filter-select-dark" : "filter-select-light"}
                >
                    <option value="All">All Roles</option>
                    <option value="admin">Admin</option>
                    <option value="author">Author</option>
                </select>
            </div>

            {/* Authors Table */}
            {isLoading ? (
                <p>Loading users...</p>
            ) : (
                <>
                    <table className={theme === "dark" ? "user-table-dark" : "user-table-light"}>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Created At</th>
                                <th>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAuthors.length > 0 ? (
                                filteredAuthors.map((author) => (
                                    <tr key={author.id}>
                                        <td>{author.username}</td>
                                        <td>{author.email}</td>
                                        <td>{new Date(author.createdAt).toLocaleDateString()}</td>
                                        <td
                                            className={
                                                author.role === "admin"
                                                    ? "status-admin"
                                                    : "status-author"
                                            }
                                        >
                                            {author.role}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4}>No users found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    {/* Pagination Controls */}
                    <div className="pagination">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <span>
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Users;

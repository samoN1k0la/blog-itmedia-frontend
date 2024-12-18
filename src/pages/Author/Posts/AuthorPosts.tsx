import React, { useState, useEffect } from "react";
import "./AuthorPosts.css";

type ComponentProps = {
    themeProvided: string;
};

const AuthorPosts: React.FC<ComponentProps> = ({ themeProvided }) => {
    const [theme, setTheme] = useState<string>(themeProvided);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        setTheme(themeProvided);
    }, [themeProvided]);

    // Placeholder posts data
    const posts = [
        { id: 1, title: "React Guide", status: "Published", date: "2024-12-01" },
        { id: 2, title: "My TypeScript Journey", status: "Draft", date: "2024-12-10" },
        { id: 3, title: "Top Climbing Spots", status: "Published", date: "2024-11-20" },
    ];

    const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="author-posts">
            <h1>My Posts</h1>
            <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />
            <table className="posts-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map((post) => (
                            <tr key={post.id}>
                                <td>{post.title}</td>
                                <td>{post.status}</td>
                                <td>{post.date}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3}>No posts found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AuthorPosts;

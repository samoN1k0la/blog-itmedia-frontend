import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AuthorPosts.css";

type ComponentProps = {
  themeProvided: string;
};

interface Post {
  id: number;
  title: string;
  status: string;
  createdAt: string;
}

const AuthorPosts: React.FC<ComponentProps> = ({ themeProvided }) => {
  const [theme, setTheme] = useState<string>(themeProvided);
  const [searchTerm, setSearchTerm] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPosts, setTotalPosts] = useState<number>(0);
  const limit = 10; // Number of posts per page

  useEffect(() => {
    setTheme(themeProvided);
  }, [themeProvided]);

  const fetchPosts = async (page: number) => {
    setIsLoading(true);
    const token = localStorage.getItem("jwt");
    if (!token) {
      alert("You are not logged in. Please log in to view your posts.");
      window.location.href = "/login";
      return;
    }

    try {
      const backendUrl = `${process.env.REACT_APP_BACKEND_URL}/posts/my-posts`;
      const response = await axios.get(backendUrl, {
        params: { page, limit },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts(response.data.posts);
      setTotalPosts(response.data.total);
    } catch (error: any) {
      console.error(
        "Error fetching posts:",
        error.response?.data?.message || error.message
      );
      alert("Error fetching posts. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

  // Filter posts based on the search term
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(totalPosts / limit);

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

      {isLoading ? (
        <p>Loading posts...</p>
      ) : (
        <>
          { console.log(filteredPosts) }    
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
                    <td>Not published</td>
                    <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3}>No posts found.</td>
                </tr>
              )}
            </tbody>
          </table>
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
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
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

export default AuthorPosts;


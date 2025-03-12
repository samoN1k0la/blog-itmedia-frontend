import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  content: string;
  hero_url: string;
}

const AuthorPosts: React.FC<ComponentProps> = ({ themeProvided }) => {
  const [theme, setTheme] = useState<string>(themeProvided);
  const [searchTerm, setSearchTerm] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPosts, setTotalPosts] = useState<number>(0);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const limit = 10; // Number of posts per page

  const navigate = useNavigate();

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

  // Handler to delete a post
  const handleDelete = async () => {
    if (!selectedPost) return;
    const token = localStorage.getItem("jwt");
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/posts/${selectedPost.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Post deleted successfully.");
      setSelectedPost(null);
      fetchPosts(currentPage);
    } catch (error: any) {
      console.error("Error deleting post:", error.response?.data?.message || error.message);
      alert("Error deleting post.");
    }
  };

  // Handler to publish a post (update status to "Published")
  const handlePublish = async () => {
    if (!selectedPost) return;
    const token = localStorage.getItem("jwt");
    try {
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/posts/${selectedPost.id}`,
        { status: "Published" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Post published successfully.");
      setSelectedPost(null);
      fetchPosts(currentPage);
    } catch (error: any) {
      console.error("Error publishing post:", error.response?.data?.message || error.message);
      alert("Error publishing post.");
    }
  };

  // Handler to navigate to the edit page for the post
  const handleEdit = () => {
    if (!selectedPost) return;
    alert("Feature not implemented yet!");
    //navigate(`/author/edit/${selectedPost.id}`);
  };

  return (
    <div className="author-posts">
      <div className="header">
        <h1>My Posts</h1>
      </div>
      
      <input
        type="text"
        placeholder="Search posts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <button 
        className="create-post-btn" 
        onClick={() => {
          navigate("/author/create");
        }}
      >
        Create Post
      </button>

      {isLoading ? (
        <p>Loading posts...</p>
      ) : (
        <>
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
                  <tr 
                    key={post.id} 
                    onClick={() => setSelectedPost(post)} 
                    className="clickable-row"
                  >
                    <td>{post.title}</td>
                    <td>{post.status}</td>
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

      {/* Modal for displaying post details */}
      {selectedPost && (
        <div className="modal-overlay" onClick={() => setSelectedPost(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedPost.hero_url} alt="hero image" />
            <h2>{selectedPost.title}</h2>
            <p>
              <strong>Status:</strong> {selectedPost.status}
            </p>
            <p>
              <strong>Date:</strong> {new Date(selectedPost.createdAt).toLocaleDateString()}
            </p>
            {/* Render the HTML content */}
            <div
              className="post-content"
              dangerouslySetInnerHTML={{ __html: selectedPost.content }}
            />
            <div className="modal-buttons">
              <button onClick={handleDelete}>Delete</button>
              {selectedPost.status != 'Published' && (
                <button onClick={handlePublish}>Publish</button>
              )}
              <button onClick={handleEdit}>Edit</button>
            </div>
            <button className="close-modal" onClick={() => setSelectedPost(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthorPosts;


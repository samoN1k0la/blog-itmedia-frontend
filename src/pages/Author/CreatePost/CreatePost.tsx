import axios from 'axios';
import DOMPurify from 'dompurify';
import React, { useState } from 'react';
import RichTextEditor from '../../../components/RichTextEditor';
import { getIdFromToken } from '../../../protected/ProtectedRoute';
import "./CreatePost.css";

const CreatePost = ({ themeProvided }: { themeProvided: string }) => {
  const [theme, setTheme] = useState<string>(themeProvided);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      setMessage({ type: 'error', text: 'Title and content cannot be empty.' });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const cleanHtml = DOMPurify.sanitize(content);
      
      const token = localStorage.getItem('jwt');
      if (token != null) {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/posts`, {
          title,
          content: cleanHtml,
          author_id: getIdFromToken(token),
          status: 'Draft'
        }, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
          }
        });
  

        setMessage({ type: 'success', text: 'Post saved successfully!' });
        setTitle('');
        setContent('');
      }
    } catch (error) {
      console.error('Failed to save post:', error);
      setMessage({ type: 'error', text: 'Failed to save post. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-post-container">
      <h2>Create a New Post</h2>

      {/* Message Display */}
      {message && <p className={`message ${message.type}`}>{message.text}</p>}

      {/* Title Input */}
      <input
        className="title-input"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter post title..."
      />

      {/* Rich Text Editor */}
      <RichTextEditor onContentChange={setContent} />

      {/* Save Button */}
      <button className="save-button" onClick={handleSave} disabled={loading}>
        {loading ? 'Saving...' : 'Save Post'}
      </button>
    </div>
  );
};

export default CreatePost;


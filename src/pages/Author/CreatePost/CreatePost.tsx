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
  const [heroImageFile, setHeroImageFile] = useState<File | null>(null);
  const [heroUploading, setHeroUploading] = useState(false);
  const [heroImageUrl, setHeroImageUrl] = useState('');

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
          status: 'Draft',
          hero_url: heroImageUrl,
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

  const addHeroImage = async () => {
    if (!heroImageFile) return;

    try {
      setHeroUploading(true);
      const formData = new FormData();
      formData.append('image', heroImageFile);

      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/posts/upload-image`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (!response.data.imageUrl) {
        throw new Error('Invalid response from server');
      }

      setHeroImageUrl(response.data.imageUrl);
      //editor.chain().focus().setImage({ src: response.data.imageUrl }).run();
      setHeroImageFile(null); // Reset file input
    } catch (error: any) {
      console.error('Image upload failed:', error.response?.data || error.message);
      alert('Image upload failed. Please try again.');
    } finally {
      setHeroUploading(false);
    }
  };

  return (
    <div className="create-post-container">
      <h2>Create a New Post</h2>

      {/* Message Display */}
      {message && <p className={`message ${message.type}`}>{message.text}</p>}

      <div className="crucial-info-container">
        {/* Title Input */}
        <input
          className="title-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter post title..."
        />

        {/* Hero image */}
        <div className="hero-input">
          <input type="file" accept="image/*" onChange={(e) => setHeroImageFile(e.target.files?.[0] || null)} />
          <button onClick={addHeroImage} disabled={!heroImageFile || heroUploading}>{heroUploading ? 'Uploading...' : '🖼️ Image'}</button> 
        </div>
      </div>

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


import { useEditor, EditorContent, BubbleMenu, FloatingMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Underline from '@tiptap/extension-underline';
import Strike from '@tiptap/extension-strike';
import Heading from '@tiptap/extension-heading';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import Blockquote from '@tiptap/extension-blockquote';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { useState } from 'react';
import axios from 'axios';
import "./RichTextEditor.css";

const RichTextEditor = ({ onContentChange }: { onContentChange: (content: string) => void }) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Italic,
      Underline,
      Strike,
      Heading.configure({ levels: [1, 2, 3] }),
      BulletList,
      OrderedList,
      ListItem,
      Blockquote,
      Link.configure({ openOnClick: true }),
      Image,
    ],
    content: '<p>Start writing your post...</p>',
    onUpdate: ({ editor }) => onContentChange(editor.getHTML()),
  });

  const addImage = async () => {
    if (!editor || !imageFile) return;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('image', imageFile);

      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/posts/upload-image`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (!response.data.imageUrl) {
        throw new Error('Invalid response from server');
      }

      editor.chain().focus().setImage({ src: response.data.imageUrl }).run();
      setImageFile(null); // Reset file input
    } catch (error: any) {
      console.error('Image upload failed:', error.response?.data || error.message);
      alert('Image upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  }; 

  return (
    <div className="editor-container">
      {/* Toolbar */}
      {editor && (
        <div className="toolbar">
          <button onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'active' : ''}>B</button>
          <button onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'active' : ''}>I</button>
          <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={editor.isActive('underline') ? 'active' : ''}>U</button>
          <button onClick={() => editor.chain().focus().toggleStrike().run()} className={editor.isActive('strike') ? 'active' : ''}>S</button>
          <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={editor.isActive('heading', { level: 1 }) ? 'active' : ''}>H1</button>
          <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editor.isActive('heading', { level: 2 }) ? 'active' : ''}>H2</button>
          <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={editor.isActive('heading', { level: 3 }) ? 'active' : ''}>H3</button>
          <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? 'active' : ''}>• List</button>
          <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive('orderedList') ? 'active' : ''}>1. List</button>
          <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={editor.isActive('blockquote') ? 'active' : ''}>"Quote"</button>
          <button onClick={() => {
            const url = prompt("Enter URL:");
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}>🔗 Link</button>
          <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
          <button onClick={addImage} disabled={!imageFile || uploading}>{uploading ? 'Uploading...' : '🖼️ Image'}</button>
        </div>
      )}

      {/* Floating Menu (for inline formatting) */}
      {editor && (
        <BubbleMenu editor={editor} className="bubble-menu">
          <button onClick={() => editor.chain().focus().toggleBold().run()}>Bold</button>
          <button onClick={() => editor.chain().focus().toggleItalic().run()}>Italic</button>
        </BubbleMenu>
      )}

      {/* Floating Menu (for block elements) */}
      {editor && (
        <FloatingMenu editor={editor} className="floating-menu">
          <button onClick={() => editor.chain().focus().toggleBulletList().run()}>Bullet List</button>
          <button onClick={() => editor.chain().focus().toggleOrderedList().run()}>Ordered List</button>
        </FloatingMenu>
      )}

      {/* Editor */}
      <EditorContent editor={editor} className="editor-content" />
    </div>
  );
};

export default RichTextEditor;


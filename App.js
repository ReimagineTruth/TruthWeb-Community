import React, { useState, useEffect } from 'react';

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    fetch('/posts')
      .then(response => response.json())
      .then(data => setPosts(data));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const post = { title, content, author };
    fetch('/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post)
    })
      .then(response => response.json())
      .then(data => setPosts([...posts, data]));
  };

  return (
    <div>
      <h1>TruthWeb Community</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Title" />
        <textarea value={content} onChange={(event) => setContent(event.target.value)} placeholder="Content" />
        <input type="text" value={author} onChange={(event) => setAuthor(event.target.value)} placeholder="Author" />
        <button type="submit">Post</button>
      </form>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p>By {post.author}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

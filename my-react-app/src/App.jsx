import { useState, useEffect } from 'react';

function App() {
  // State for storing fetched posts and error message
  const [posts, setPosts] = useState([]); // State for storing fetched posts
  const [error, setError] = useState(null); // State for storing error message

  // Fetch posts when component mounts
  useEffect(() => {
    fetchPosts();
  }, []);

  // Function to fetch posts asynchronously
  const fetchPosts = async () => {
    try {
      // Fetch posts from the API
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      // Check if response is OK
      if (!response.ok) {
        // If response is not OK, throw an error
        throw new Error('Failed to fetch posts');
      }
      // Parse response as JSON
      const data = await response.json();
      // Update state with fetched posts
      setPosts(data);
    } catch (error) {
      // If an error occurs during fetching, set the error state
      setError(error.message);
    }
  };

  return (
    <div className="App">
      {/* Header */}
      <h1>Blog Posts</h1>
      {/* Conditional rendering based on error state */}
      {error ? ( // If error state is not null, display error message
        <div className="error">{error}</div>
      ) : ( // Otherwise, render list of posts
        <ul>
          {/* Map through fetched posts and render each post */}
          {posts.map(post => (
            <li key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;

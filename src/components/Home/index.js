import React, { useState } from "react";
import axios from "axios";
import "./index.css";

const Home = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?query=${query}&client_id=9Ef7pYz-KsyT6DcKWX2JAh5ydiKB6kAgZehoDKeMuoQ`
      );
      setImages(response.data.results);
    } catch (error) {
      console.error("Error fetching images", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      fetchImages();
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for images..."
            value={query || ""}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </header>
      {loading ? (
        <div className="loader">Loading...</div>
      ) : (
        <div className="image-grid">
          {images.map((image) => (
            <div key={image.id} className="image-item">
              <img src={image.urls.small} alt={image.alt_description} />
              <div className="image-info">
                <p>{image.alt_description}</p>
                <a
                  href={image.links.html}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on Unsplash
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;

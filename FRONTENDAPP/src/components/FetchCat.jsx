import React, { useState, useEffect } from 'react';

const CatPic = () => {
  const [catImage, setCatImage] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchCat = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://api.thecatapi.com/v1/images/search");
      const data = await response.json();
      setCatImage(data[0].url); // data.message contains the image URL
    } catch (error) {
      console.error("Error fetching kitty:", error);
    } finally {
      setLoading(false);
    }
  };

  // Optional: Load a dog immediately when the page first opens
  useEffect(() => {
    fetchCat();
  }, []);

  return (
    <div style={{ textAlign: 'right', marginTop: '10px' }}>
      <h3>For the cat lovers 🐈‍⬛</h3>
      <div>
        {loading ? (
          <p>Finding a kitty...</p>
        ) : (
          catImage && <img src={catImage}
            alt="A sweetie angel kitty"
            style={{
              maxWidth: '100%', 
              maxHeight: '200px',
              borderRadius: '11px',  
              border: '2px solid var(--dark-green)'
    }}/>
)} 
      </div>
      <button className = 'button1'
        onClick={fetchCat} 
        disabled={loading}
      >
        {loading ? "Loading..." : "⟢Pssp Pssp⟢"}
      </button>
    </div>
  );
};

export default CatPic;

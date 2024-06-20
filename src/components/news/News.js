import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import "./News.css";

const News = () => {
  const [mynews, setMyNews] = useState([]);
  const [category, setCategory] = useState("general");
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  ); // State for favorites
  const [showFavorites, setShowFavorites] = useState(false); // State to toggle the view
  const [error, setError] = useState(null); // State for error handling

  const categories = [
    "general",
    "business",
    "technology",
    "entertainment",
    "health",
    "science",
    "sports",
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Show loading before fetching data
      setError(null); // Reset error state
      try {
        const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&page=${page}&pageSize=10&apiKey=e8c9ca55ca954614bd5113642664b4fa`;

        let response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);

        let data = await response.json();
        setMyNews(data.articles);
        setTotalResults(data.totalResults);
      } catch (error) {
        console.error("Error fetching news data: ", error);
        setError("Failed to fetch news. Please try again later."); // Set error message
      } finally {
        setLoading(false); // Hide loading after fetching data
      }
    };

    if (!showFavorites) {
      fetchData();
    }
  }, [category, page, showFavorites]);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= Math.ceil(totalResults / 10)) {
      setPage(newPage);
    }
  };

  const addToFavorites = (article) => {
    if (!favorites.some((fav) => fav.url === article.url)) {
      const newFavorites = [...favorites, article];
      setFavorites(newFavorites);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
    } else {
      alert("This article is already in your favorites."); // Feedback if article is already saved
    }
  };

  const handleToggleFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img
              src={logo}
              alt="App Logo"
              className="d-inline-block align-top"
              width="40"
              height="40"
            />
            NewsApp
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <button className="btn btn-link" onClick={handleToggleFavorites}>
                  {showFavorites ? "Back to News" : "View Favorites"}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="headline-container">
        <h1 className="text-center my-3">Top Headlines</h1>
      </div>
      <div className="info-container">
        <p className="text-center mt-3">
          Stay informed with the latest news from around the world.
        </p>
      </div>

      <div className="controls-container">
  <div className="category-container">
    <label
      htmlFor="category-select"
      className="me-2"
      style={{ fontWeight: "bold", color: "purple" }}
    >
      Choose a category:
    </label>
    <select
      id="category-select"
      value={category}
      onChange={handleCategoryChange}
    >
      {categories.map((cat) => (
        <option key={cat} value={cat}>
          {cat.charAt(0).toUpperCase() + cat.slice(1)}
        </option>
      ))}
    </select>
  </div>
</div>

      <div className="mainDiv">
        {(showFavorites ? favorites : mynews).map((ele, index) => (
          <div key={index} className="card">
            <img
              src={
                ele.urlToImage ||
                "https://resize.indiatvnews.com/en/centered/newbucket/1200_675/2024/06/breaking-news-template-1-1709432359-1710204918-1718758971.jpg"
              }
              className="card-img-top"
              alt="News"
            />
            <div className="card-body">
              <h5 className="card-title">{ele.author || "Unknown Author"}</h5>
              <p className="card-text">{ele.title}</p>
              <div className="d-flex justify-content-between align-items-center">
                <a
                  href={ele.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Read More
                </a>
                {!showFavorites && (
                  <button
                    onClick={() => addToFavorites(ele)}
                    className="btn btn-secondary"
                  >
                    Save to Favorites
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {!showFavorites && (
        <div className="pagination justify-content-center mt-3">
          <button
            className="btn btn-secondary me-2"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            Previous
          </button>
          <span>
            Page {page} of {Math.ceil(totalResults / 10)}
          </span>
          <button
            className="btn btn-secondary ms-2"
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= Math.ceil(totalResults / 10)}
          >
            Next
          </button>
        </div>
      )}

      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </>
  );
};

export default News;

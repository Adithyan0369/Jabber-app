import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewsCard from './NewsCard'; // Import the NewsCard component

const API_URL = 'https://gnews.io/api/v4/top-headlines?category=general&lang=en&country=in&max=10&apikey=791b06c4a1693382a8740e2d95b64f8c';

function App() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios.get(API_URL)
      .then(response => {
        const filteredArticles = response.data.articles.filter(article => article.image && article.description);
        setNews(filteredArticles);

      })
      .catch(error => {
        console.error("There was an error fetching the news!", error);
      });
  }, []);

  return (
    <div className="min-h-full bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Top Headlines</h1>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 overflow-y-auto max-h-[80vh] scrollbar-hide">
        {news.map((article, index) => (
          <NewsCard key={index} article={article} />
        ))}
      </div>
    </div>
  );
}

export default App;

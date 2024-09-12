import React from 'react';

function NewsCard({ article }) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <img className="w-full h-48 object-cover rounded-t-lg" src={article.image} alt={article.title} />
      <div className="p-2">
        <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
        <p className="text-gray-400 text-sm mb-4">{article.description}</p>
        <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Read more</a>
      </div>
    </div>
  );
}

export default NewsCard;

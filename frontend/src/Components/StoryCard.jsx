
import React, { useState } from "react";

const StoryCard = ({ id, title, content, author, likes }) => {
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = () => {
    setLikeCount(likeCount + 1);
  };

  return (
    <div className="p-4 bg-gray-800 text-white rounded-lg shadow-md mb-4">
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="mt-2 text-gray-300">{content}</p>
      <div className="flex items-center justify-between mt-4">
        <span className="text-sm text-gray-400">Author: {author}</span>
        <div className="flex items-center space-x-2">
          <button
            className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded-lg shadow"
            onClick={handleLike}
          >
            👍 Like
          </button>
          <span className="text-sm">{likeCount} likes</span>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;

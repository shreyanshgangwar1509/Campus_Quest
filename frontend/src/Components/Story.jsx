// src/pages/Stories.jsx
import React from "react";

import { stories } from "../data/stories";
import StoryCard from "./StoryCard";

const Stories = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-800 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Stories</h1>
      <div className="max-w-3xl mx-auto">
        {stories.map((story) => (
          <StoryCard
            key={story.id}
            id={story.id}
            title={story.title}
            content={story.content}
            author={story.author}
            likes={story.likes}
          />
        ))}
      </div>
    </div>
  );
};

export default Stories;

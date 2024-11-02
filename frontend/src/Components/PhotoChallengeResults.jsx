// components/PhotoChallengeResults.js
import React from 'react';

const PhotoChallengeResults = ({ challenge }) => {
    return (
        <div>
            <h2 className="text-xl">Results</h2>
            <ul>
                {challenge.submissions.map((submission) => (
                    <li key={submission._id} className="flex items-center">
                        <img src={submission.imageUrl} alt="Challenge Submission" className="w-20 h-20 mr-2" />
                        {/* Add voting buttons and logic */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PhotoChallengeResults;

// components/PhotoChallengeList.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const PhotoChallengeList = () => {
    const [challenges, setChallenges] = useState([]);

    useEffect(() => {
        const fetchChallenges = async () => {
            const response = await axios.get('/api/photoChallenges');
            setChallenges(response.data);
        };
        fetchChallenges();
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold">Photo Challenges</h1>
            <ul>
                {challenges.map((challenge) => (
                    <li key={challenge._id} className="p-4 border-b">
                        <h2 className="text-xl">{challenge.title}</h2>
                        <p>{challenge.description}</p>
                        <p>Start Date: {new Date(challenge.startDate).toLocaleDateString()}</p>
                        <p>End Date: {new Date(challenge.endDate).toLocaleDateString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PhotoChallengeList;

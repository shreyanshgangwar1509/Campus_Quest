// pages/photoChallenge.js
import React from 'react';
import PhotoChallengeList from '../Components/PhotoChallengeList';
import PhotoChallengeResults from '../Components/PhotoChallengeResults';
import PhotoSubmission from '../Components/PhotoSubmission';


const PhotoChallengePage = () => {
    return (
        <div>
            <PhotoChallengeList />
            <PhotoSubmission challengeId="someChallengeId" /> {/* Pass actual challenge ID */}
            <PhotoChallengeResults challenge={{ /* Challenge data */ }} />
        </div>
    );
};

export default PhotoChallengePage;

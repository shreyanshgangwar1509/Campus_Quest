// components/PhotoSubmission.js
import axios from 'axios';
import React, { useState } from 'react';

const PhotoSubmission = ({ challengeId }) => {
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);

        // Upload the image to a cloud storage (like AWS S3, Cloudinary, etc.) and get the URL
        const imageUrl = await uploadImage(formData); // Assume this function is implemented

        // Submit the photo
        await axios.post(`/api/photoChallenges/${challengeId}/submit`, {
            userId: 'userId', // Replace with actual user ID
            imageUrl,
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                required
            />
            <button type="submit">Submit Photo</button>
        </form>
    );
};

export default PhotoSubmission;

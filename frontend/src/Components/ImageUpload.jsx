import axios from 'axios';
import React, { useState } from 'react';

const ImageUpload = () => {
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');

    const handleChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', image);

        try {
            const response = await axios.post('/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setImageUrl(response.data.url); // Get the image URL from the response
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleChange} required />
                <button type="submit">Upload</button>
            </form>
            {imageUrl && <img src={imageUrl} alt="Uploaded" />}
        </div>
    );
};

export default ImageUpload;

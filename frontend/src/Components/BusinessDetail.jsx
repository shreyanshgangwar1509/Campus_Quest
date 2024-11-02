// components/BusinessDetail.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const BusinessDetail = ({ businessId }) => {
    const [business, setBusiness] = useState(null);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    useEffect(() => {
        const fetchBusiness = async () => {
            const response = await axios.get(`/api/business/${businessId}`);
            setBusiness(response.data);
        };
        fetchBusiness();
    }, [businessId]);

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        await axios.post(`/api/business/${businessId}/review`, {
            userId: 'userId', // Replace with actual user ID
            rating,
            comment,
        });
        setComment('');
        setRating(0);
    };

    if (!business) return <div>Loading...</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold">{business.name}</h1>
            <p>{business.description}</p>
            <h2 className="text-xl">Reviews</h2>
            <ul>
                {business.reviews.map((review) => (
                    <li key={review._id}>
                        <p>{review.comment}</p>
                        <p>Rating: {review.rating}</p>
                    </li>
                ))}
            </ul>
            <form onSubmit={handleReviewSubmit}>
                <input
                    type="number"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    min="1"
                    max="5"
                    placeholder="Rating (1-5)"
                    required
                />
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Leave a comment"
                    required
                ></textarea>
                <button type="submit">Submit Review</button>
            </form>
        </div>
    );
};

export default BusinessDetail;

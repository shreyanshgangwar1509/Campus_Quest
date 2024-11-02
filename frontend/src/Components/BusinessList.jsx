// components/BusinessList.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const BusinessList = () => {
    const [businesses, setBusinesses] = useState([]);

    useEffect(() => {
        const fetchBusinesses = async () => {
            const response = await axios.get('/api/business');
            setBusinesses(response.data);
        };
        fetchBusinesses();
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold">Local Businesses</h1>
            <ul>
                {businesses.map((business) => (
                    <li key={business._id} className="p-4 border-b">
                        <h2 className="text-xl">{business.name}</h2>
                        <p>{business.description}</p>
                        <p>{business.address}</p>
                        <p>Contact: {business.contact}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BusinessList;

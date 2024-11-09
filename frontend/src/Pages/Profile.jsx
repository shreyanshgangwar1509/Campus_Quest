import axios from 'axios';
import React, { useEffect, useState } from 'react';
import TeamFrontPage from './TeamFrontPage';

const api = axios.create({
    baseURL: 'http://localhost:3000',
});

function Profile() {
    const [profileData, setProfileData] = useState(null);
    const [error, setError] = useState('');

      const fetchProfile = async () => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage

    if (!token) {
      setError('Token not found. Please log in again.');
      return;
    }

    try {
      const response = await api.get('/api/auth/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
        
        
        setProfileData(response.data);
        console.log(profileData);
    } catch (err) {
      console.error('Error fetching profile:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Failed to fetch profile.');
    }
  };

    useEffect(() => {
    fetchProfile();
  }, []);
    return (
        <div>
            <h1>Profile Page</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {profileData ? (
                <div>
                    <p><strong>Name:</strong> {profileData.user.username}</p>
                    <p><strong>Email:</strong> {profileData.user.email}</p>
                    <TeamFrontPage/>
                </div>
                
            ) : (
                <p>Loading profile data...</p>
            )}
        </div>
    );
}

export default Profile;

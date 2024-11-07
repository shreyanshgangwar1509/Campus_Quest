// GoogleSignIn.js
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import React from 'react';

function GoogleSignIn() {
  const handleGoogleSignInSuccess = async (credentialResponse) => {
    try {
      const token = credentialResponse.credential;
      
      // Send the token to your backend for verification
      const response = await axios.post('http://localhost:3000/api/auth/google', {
        token,
      });

      // Handle the response from your backend (e.g., set user data, redirect)
      console.log("User data:", response.data);

      // Here you might store the user info in your app's state or local storage
      // For example:
      // localStorage.setItem("user", JSON.stringify(response.data));
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const handleGoogleSignInFailure = () => {
    console.error("Google Sign-In failed");
  };

  return (
    <div>
      <GoogleLogin
        onSuccess={handleGoogleSignInSuccess}
        onError={handleGoogleSignInFailure}
      />
    </div>
  );
}

export default GoogleSignIn;

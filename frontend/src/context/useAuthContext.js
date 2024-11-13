import jwtDecode from 'jwt-decode';
import { useState } from "react";
export const useAuthContext = () => {
    const [auth, setauth] = useState(null);
    try {
        const token = localStorage.getItem('token');
        const decoded = jwtDecode(token);
        setauth(decoded);
        console.log(decoded);
    } catch (error) {
        console.log('Please login first ');
    }
    return auth;
}
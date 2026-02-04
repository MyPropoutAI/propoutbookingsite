import axios from 'axios';

const api = axios.create({
    baseURL: 'https://propout-backend.vercel.app/api',
    // baseURL: 'http://localhost:5000/api' // Adjust base URL as needed
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;

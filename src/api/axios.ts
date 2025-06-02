import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// since no server is live, then simulate the delay
api.interceptors.response.use(
  async response => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return response;
  },
  error => Promise.reject(error),
);

export { api };

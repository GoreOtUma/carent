import axios from 'axios';

const api = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:8000/api/v1/',
});

// Удаление `Z` из ISO-дат во всех POST/PUT/PATCH-запросах
api.interceptors.request.use((config) => {
  if (config.data && typeof config.data === 'object') {
    const stripZFromDates = (obj) => {
      for (const key in obj) {
        if (typeof obj[key] === 'string' && obj[key].endsWith('Z') && /^\d{4}-\d{2}-\d{2}T/.test(obj[key])) {
          obj[key] = obj[key].replace('Z', '');
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
          stripZFromDates(obj[key]); // рекурсивно для вложенных объектов
        }
      }
    };

    stripZFromDates(config.data);
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;

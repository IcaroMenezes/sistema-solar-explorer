import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar o token JWT em todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  async register(username: string, email: string, password: string) {
    const response = await api.post('/auth/register', { username, email, password });
    return response.data;
  },

  async login(email: string, password: string) {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
};

export const planetService = {
  async getAllPlanets() {
    const response = await api.get('/planets');
    return response.data;
  },

  async getPlanetById(id: string) {
    const response = await api.get(`/planets/${id}`);
    return response.data;
  },

  async createPlanet(planetData: {
    name: string;
    description: string;
    diameter: number;
    distanceFromSun: number;
    numberOfMoons: number;
    surfaceTemperature: number;
    imageUrl: string;
  }) {
    const response = await api.post('/planets', planetData);
    return response.data;
  },
};

export default api; 
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export interface Planet {
  id: string;
  name: string;
  description: string;
  diameter: number;
  distanceFromSun: number;
  numberOfMoons: number;
  surfaceTemperature: number;
  rotationPeriod: number;
  image: string;
  hasRings: boolean;
  isCustom: boolean;
  createdBy: string;
}

export const createPlanet = async (planet: Omit<Planet, 'id'>): Promise<Planet> => {
  const response = await axios.post(`${API_URL}/planets`, planet, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data;
};

export const getPlanets = async (): Promise<Planet[]> => {
  const response = await axios.get(`${API_URL}/planets`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data;
};

export const getPlanetById = async (id: string): Promise<Planet> => {
  const response = await axios.get(`${API_URL}/planets/${id}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data;
};

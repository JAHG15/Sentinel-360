import axios from 'axios';
import { API_URL as API_BASE_URL } from './api';

const API_URL = `${API_BASE_URL}/usuarios`;

// Obtener todos los usuarios
export const getUsuarios = async (token) => {
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

// Crear un usuario
export const createUsuario = async (token, data) => {
  const res = await axios.post(API_URL, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

// Actualizar un usuario
export const updateUsuario = async (token, id, data) => {
  const res = await axios.put(`${API_URL}/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

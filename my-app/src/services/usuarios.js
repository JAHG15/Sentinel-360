import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/usuarios';

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

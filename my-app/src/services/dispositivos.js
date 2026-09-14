import axios from 'axios'
import { API_URL } from './api'

const api = axios.create({
  baseURL: API_URL,
})

export const getDispositivos = async (token) => {
  const res = await api.get('/dispositivos', {
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.data
}

export const createDispositivo = async (token, data) => {
  const res = await api.post('/dispositivos', data, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.data
}

export const updateDispositivo = async (token, id, data) => {
  const res = await api.put(`/dispositivos/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.data
}

export const deleteDispositivo = async (token, id) => {
  const res = await api.delete(`/dispositivos/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.data
}

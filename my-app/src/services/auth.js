import axios from "axios"

const API_URL = "http://127.0.0.1:8000/api"

export const loginRequest = async (credentials) => {
  try {
    const res = await axios.post(`${API_URL}/login`, credentials, {
      headers: { "Content-Type": "application/json" },
    })
    return res.data
  } catch (err) {
    if (err.response) {
      throw new Error(err.response.data.message || "Error en el servidor")
    } else {
      throw new Error("No se pudo conectar con el servidor")
    }
  }
}

export const logoutRequest = async (token) => {
  try {
    const res = await axios.post(
      `${API_URL}/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    console.log('Logout response:', res.data)
  } catch (err) {
    console.error("Error al cerrar sesión en backend:", err.response || err)
  }
}

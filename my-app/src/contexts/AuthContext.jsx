import { createContext, useEffect, useState } from "react"
import { logoutRequest } from "../services/auth"

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null
    } catch {
      return null
    }
  })

  const [token, setToken] = useState(() => localStorage.getItem("token") || null)

  const [routes, setRoutes] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("routes")) || {}
    } catch {
      return {}
    }
  })

  // Mantener sincronizado con localStorage
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user))
    else localStorage.removeItem("user")

    if (token) localStorage.setItem("token", token)
    else localStorage.removeItem("token")

    if (routes) localStorage.setItem("routes", JSON.stringify(routes))
    else localStorage.removeItem("routes")
  }, [user, token, routes])

  const login = ({ user, token, routes }) => {
    setUser(user)
    setToken(token)
    setRoutes(routes)
  }

  const logout = async () => {
    if (token) await logoutRequest(token)
    setUser(null)
    setToken(null)
    setRoutes({})
  }

  return (
    <AuthContext.Provider value={{ user, token, routes, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

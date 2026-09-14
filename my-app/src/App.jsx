import { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'
import { AuthContext, AuthProvider } from './contexts/AuthContext'
import Dispositivos from './pages/Dispositivos'
import Login from './pages/Login'
import Redes from './pages/Redes'
import Usuarios from './pages/Usuarios'

// Componente para proteger rutas privadas generales
function PrivateRoute({ children }) {
  const { user, token } = useContext(AuthContext)
  if (!user || !token) {
    return <Navigate to="/login" replace />
  }
  return children
}

// Componente para proteger rutas solo admin
function AdminRoute({ children }) {
  const { user } = useContext(AuthContext)
  if (!user || user.rol !== 'admin') {
    return <Navigate to="/" replace />
  }
  return children
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Ruta pública */}
        <Route path="/login" element={<Login />} />

        {/* Rutas privadas dentro del layout */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate to="/redes" replace />} />
          <Route path="redes" element={<Redes />} />
          <Route path="dispositivos" element={<Dispositivos />} />

          {/* Solo admin puede acceder a usuarios */}
          <Route
            path="usuarios"
            element={
              <AdminRoute>
                <Usuarios />
              </AdminRoute>
            }
          />
        </Route>

        {/* Si no encuentra ruta, manda a login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AuthProvider>
  )
}

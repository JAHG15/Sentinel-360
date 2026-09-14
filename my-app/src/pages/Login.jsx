import { Button, Form, Input, message } from "antd"
import axios from "axios"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import "../assets/Login.css"
import logo from "../assets/logo.jpg"
import { AuthContext } from "../contexts/AuthContext"

export default function Login() {
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("") // <-- mensaje de error visible

  const loginRequest = async (values) => {
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/login",
        values,
        { headers: { "Content-Type": "application/json" } }
      )
      return res.data
    } catch (err) {
      // Leer el mensaje enviado por Laravel
      const msg =
        err.response?.data?.message || "Error de conexión con el servidor"
      throw new Error(msg)
    }
  }

  const onFinish = async (values) => {
    setLoading(true)
    setErrorMsg("") // limpiar mensaje previo
    try {
      const res = await loginRequest(values)

      if (!res || !res.access_token) {
        throw new Error("Credenciales inválidas")
      }

      login({
        user: res.usuario,
        token: res.access_token,
        routes: res.rutas,
      })

      message.success("Bienvenido " + res.usuario.nombre)
      navigate("/redes")
    } catch (err) {
      console.error("Error en login:", err)
      setErrorMsg(err.message) // <-- mostrar mensaje en pantalla
      message.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        background: "linear-gradient(to bottom, #000000, #535353)",
      }}
    >
      {/* Lado izquierdo */}
      <div
        style={{
          flex: 0.65,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#000",
          borderTopRightRadius: "50% 50%",
          borderBottomRightRadius: "50% 50%",
          overflow: "hidden",
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{ width: "70%", height: "auto", objectFit: "contain" }}
        />
      </div>

      {/* Lado derecho con formulario */}
      <div
        style={{
          flex: 0.35,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem",
          color: "white",
        }}
      >
        <h2 style={{ color: "white", marginBottom: "2rem" }}>Sentinel 360</h2>
        <Form
          name="login"
          layout="vertical"
          onFinish={onFinish}
          style={{ width: "100%", maxWidth: 350 }}
        >
          <Form.Item
            name="correo"
            rules={[
              { required: true, message: "Ingrese su correo" },
              { type: "email", message: "Ingrese un correo válido" },
            ]}
          >
            <Input
              placeholder="Correo electrónico"
              style={{ borderRadius: "8px", padding: "10px" }}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Ingrese su contraseña" }]}
          >
            <Input.Password
              placeholder="Contraseña"
              style={{ borderRadius: "8px", padding: "10px" }}
            />
          </Form.Item>

          {/* Mostrar mensaje de error debajo del formulario */}
          {errorMsg && (
            <div style={{ color: "red", marginBottom: "1rem", textAlign: "center" }}>
              {errorMsg}
            </div>
          )}

          <Form.Item>
            <Button
              htmlType="submit"
              block
              className="login-button"
              loading={loading}
            >
              Iniciar sesión
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

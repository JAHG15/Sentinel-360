import { ClusterOutlined, DesktopOutlined, LoadingOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Layout, Menu, Modal, Spin } from 'antd'
import { useContext, useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.jpg'
import { AuthContext } from '../../contexts/AuthContext'

const { Header, Sider, Content } = Layout

export default function MainLayout() {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()

  // Estado para controlar el modal
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false) // Nuevo estado para el spinner

  // Mostrar modal
  const showLogoutModal = () => setIsModalVisible(true)

  // Confirmar cierre de sesión con animación
  const handleOk = async () => {
    setIsModalVisible(false)
    setIsLoading(true) // Mostrar animación

    // Simular tiempo de espera antes de cerrar sesión
    setTimeout(async () => {
      await logout()
      setIsLoading(false)
      navigate('/login')
    }, 1500) // Puedes ajustar el tiempo si lo deseas
  }

  // Cancelar cierre de sesión
  const handleCancel = () => setIsModalVisible(false)

  const getTitle = () => {
    if (location.pathname.includes('redes')) return 'Redes'
    if (location.pathname.includes('dispositivos')) return 'Dispositivos'
    if (location.pathname.includes('usuarios')) return 'Usuarios'
    return ''
  }

  const selectedKey = location.pathname.includes('redes')
    ? 'redes'
    : location.pathname.includes('dispositivos')
    ? 'dispositivos'
    : location.pathname.includes('usuarios')
    ? 'usuarios'
    : ''

  // Filtrar menú según rol
  const menuItems = [
    { key: 'redes', icon: <ClusterOutlined />, label: 'Redes', path: '/redes' },
    { key: 'dispositivos', icon: <DesktopOutlined />, label: 'Dispositivos', path: '/dispositivos' },
    ...(user?.rol === 'admin'
      ? [{ key: 'usuarios', icon: <UserOutlined />, label: 'Usuarios', path: '/usuarios' }]
      : [])
  ]

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Animación de carga (centrada sobre toda la pantalla) */}
      {isLoading && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
          }}
        >
          <Spin
            indicator={<LoadingOutlined style={{ fontSize: 48, color: '#fff' }} spin />}
          />
          <p style={{ color: '#fff', marginTop: 16, fontSize: 16 }}>
            Cerrando sesión...
          </p>
        </div>
      )}

      <Sider
        collapsible={false}
        width={250}
        style={{
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(to bottom, #000000, #535353)',
        }}
      >
        <div style={{ textAlign: 'center', padding: '24px 16px' }}>
          <Avatar src={logo} size={100} style={{ marginBottom: 16 }} />
          <div style={{ color: '#fff', fontWeight: 700, marginBottom: 4 }}>
            {user
              ? `${user.nombre} ${user.apellido_paterno} ${user.apellido_materno}`
              : 'Usuario'}
          </div>
          <div style={{ color: '#ccc', fontSize: 12 }}>{user ? user.correo : 'correo@ejemplo.com'}</div>
        </div>

        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          style={{
            flex: 1,
            background: 'transparent',
            borderRight: 'none',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {menuItems.map(item => {
            const isSelected = selectedKey === item.key
            return (
              <Menu.Item
                key={item.key}
                icon={item.icon}
                style={{
                  color: isSelected ? '#000' : '#fff',
                  backgroundColor: isSelected ? '#fff' : 'transparent',
                  marginBottom: 8,
                  borderRadius: 10,
                  fontWeight: 600,
                }}
              >
                <Link
                  to={item.path}
                  style={{
                    color: isSelected ? '#000' : '#fff',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {item.label}
                </Link>
              </Menu.Item>
            )
          })}

          <Menu.Item
            key="logout"
            icon={<LogoutOutlined />}
            onClick={showLogoutModal}
            style={{
              marginTop: '130px',
              color: '#fff',
              fontWeight: 600,
            }}
          >
            Cerrar sesión
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Header
          style={{
            background: '#000',
            color: '#fff',
            textAlign: 'center',
            fontSize: 20,
            fontWeight: 600,
          }}
        >
          {getTitle()}
        </Header>

        <Content
          style={{
            margin: 0,
            background: 'linear-gradient(to bottom, #1a1a1a, #6b6b6b)',
            padding: 16,
            borderRadius: 0,
          }}
        >
          <Outlet />
        </Content>
      </Layout>

      {/* Modal de confirmación */}
      <Modal
        title="¿Estás seguro que deseas cerrar sesión?"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Sí"
        cancelText="No"
      >
        <p>Se cerrará tu sesión y tendrás que iniciar sesión nuevamente.</p>
      </Modal>
    </Layout>
  )
}

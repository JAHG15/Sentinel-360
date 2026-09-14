// datos simulados y funciones que devuelven promesas
const redesMock = [
  { id: 1, nombre: 'Red A', descripcion: 'Red de oficina A', ip: '192.168.1.0' },
  { id: 2, nombre: 'Red B', descripcion: 'Red de bodega', ip: '10.0.0.0' },
]

const dispositivosMock = [
  { id: 1, nombre: 'Sensor 1', tipo: 'Sensor', ip: '192.168.1.10', redId: 1 },
  { id: 2, nombre: 'Router 1', tipo: 'Router', ip: '192.168.1.1', redId: 1 },
]

const usuariosMock = [
  { id: 1, nombre: 'Joshua', apellido_paterno: 'Gonzalez', correo: 'joshua@example.com', rol: 'admin', telefono: '1234567890', estatus: true },
  { id: 2, nombre: 'Ana', apellido_paterno: 'Lopez', correo: 'ana@example.com', rol: 'usuario', telefono: '0987654321', estatus: true },
]

// Simulación login: acepta cualquier email/password y retorna usuario admin si email contiene 'admin'
export async function mockLogin({ correo, password }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!correo || !password) return reject(new Error('Correo y contraseña requeridos'))
      // busca user en usuariosMock por correo
      const found = usuariosMock.find(u => u.correo === correo)
      const user = found || usuariosMock[0] // si no existe, devuelve primer usuario por defecto
      // construye rutas según rol
      const rutas = user.rol === 'admin'
        ? {
            redes: ['GET','POST','PUT','DELETE'],
            dispositivos: ['GET','POST','PUT','DELETE'],
            usuarios: ['GET','POST','PUT','DELETE']
          }
        : {
            redes: ['GET'],
            dispositivos: ['GET'],
            usuarios: ['GET']
          }
      resolve({
        user,
        token: 'mock-token-123',
        routes: rutas
      })
    }, 600)
  })
}

// APIs CRUD simuladas (devuelven copia de arrays; en app usar setState para mutaciones)
export async function fetchRedes() {
  return new Promise(res => setTimeout(() => res([...redesMock]), 300))
}
export async function fetchDispositivos() {
  return new Promise(res => setTimeout(() => res([...dispositivosMock]), 300))
}
export async function fetchUsuarios() {
  return new Promise(res => setTimeout(() => res([...usuariosMock]), 300))
}

# Sentinel

Sistema web con arquitectura separada (Frontend en React/Vite y Backend en Laravel), completamente dockerizado para entornos de desarrollo y producción.

## Requisitos Previos
- **Docker y Docker Compose** instalados (Virtualización y WSL activos si estás en Windows).
- **Git** para clonar el repositorio.
- *Nota: Ya no es necesario tener XAMPP, PHP ni Node.js instalados localmente.*

## Instalación y Ejecución Rápida

**1. Clonar el repositorio**
bash
git clone https://github.com/JAHG15/Sentinel.git
cd Sentinel


**2. Configurar el entorno del Backend**
Por seguridad, el archivo de variables de entorno no se incluye en el repositorio.
- Ve a la carpeta `backend/`.
- Duplica el archivo `.env.example` y renómbralo a `.env` (o crea uno nuevo si no existe).
- Asegúrate de que las credenciales de la base de datos apunten al contenedor de Docker exactamente así:
env
DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=sentinel
DB_USERNAME=root
DB_PASSWORD=root


**3. Levantar la infraestructura**
Regresa a la raíz del proyecto (donde se encuentra `docker-compose.yml`) y ejecuta:
bash
docker compose up --build -d

*(La bandera `-d` lo ejecuta en segundo plano para que tu terminal quede libre).*

## Accesos de la Aplicación

Una vez que los contenedores estén en ejecución, puedes acceder a los servicios en las siguientes rutas:

- **Frontend (Interfaz de usuario):** [http://localhost:5173](http://localhost:5173)
- **Backend (API Laravel):** [http://localhost:8000](http://localhost:8000)

## Gestión de Base de Datos
La base de datos MySQL 8.0 se inicializa automáticamente con la estructura y los datos de `database/sentinel.sql` al crear el contenedor por primera vez. 

Para gestionar la información mediante consultas SQL avanzadas o visualizar esquemas relacionales, puedes establecer una conexión directa desde DBeaver utilizando estos parámetros:
- **Host:** `localhost`
- **Puerto:** `3306`
- **Usuario:** `root`
- **Contraseña:** `root`

## Autor
- **Joshua Anthony Hernández González**
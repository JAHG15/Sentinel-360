# Sentinel 360

Sistema web con frontend React/Vite y backend Laravel, ejecutado con Docker Compose.

## Requisitos previos

- Docker Desktop iniciado, con el motor Linux activo.
- Git.
- En Windows, virtualizacion y WSL habilitados.

No es necesario instalar PHP, Composer, Node.js ni XAMPP localmente.

## Instalacion desde cero

### 1. Clonar el repositorio

```bash
git clone https://github.com/JAHG15/Sentinel-360.git
cd Sentinel-360
```

### 2. Configurar el backend

```powershell
Copy-Item backend/.env.example backend/.env
```

En `backend/.env`, configura estos valores para Docker:

```env
APP_KEY=
DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=sentinel
DB_USERNAME=root
DB_PASSWORD=root
SESSION_DRIVER=file
CACHE_STORE=file
QUEUE_CONNECTION=sync
SANCTUM_STATEFUL_DOMAINS=localhost,localhost:5173,127.0.0.1,127.0.0.1:5173
```

### 3. Configurar el frontend

```powershell
Copy-Item my-app/.env.example my-app/.env.local
```

El archivo `my-app/.env.local` debe contener:

```env
VITE_API_URL=http://127.0.0.1:8000/api
```

### 4. Construir y ejecutar

Desde la carpeta raiz del repositorio:

```bash
docker compose up --build -d
docker compose exec backend php artisan key:generate --force
```

La base de datos se inicializa con `database/sentinel.sql` la primera vez que
se crea el volumen de MySQL.

## Accesos de la Aplicación

Una vez que los contenedores estén en ejecución, puedes acceder a los servicios en las siguientes rutas:

- **Frontend (Interfaz de usuario):** [http://localhost:5173](http://localhost:5173)
- **Backend (API Laravel):** [http://localhost:8000](http://localhost:8000)

Si el frontend se abrira desde otra computadora, cambia `VITE_API_URL` por la
IP del equipo donde corre Docker y vuelve a ejecutar `docker compose up --build -d`.

## Comandos utiles

Ver el estado de los servicios:

```bash
docker compose ps
```

Detener los servicios sin eliminar los datos:

```bash
docker compose down
```

Volver a iniciar:

```bash
docker compose up --build -d
```

No uses `docker compose down -v` salvo que quieras eliminar tambien el volumen
de la base de datos.

## Gestión de Base de Datos
La base de datos MySQL 8.0 se inicializa automáticamente con la estructura y los datos de `database/sentinel.sql` al crear el contenedor por primera vez. 

Para gestionar la información mediante consultas SQL avanzadas o visualizar esquemas relacionales, puedes establecer una conexión directa desde DBeaver utilizando estos parámetros:
- **Host:** `localhost`
- **Puerto:** `3306`
- **Usuario:** `root`
- **Contraseña:** `root`

## Autor
- **Joshua Anthony Hernández González**
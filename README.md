# Mi Servidor

Este proyecto es un servidor básico construido con Node.js, Express y Socket.io. Utiliza la sintaxis de ECMAScript 6 y se configura a través de variables de entorno con dotenv.

## Estructura del Proyecto

El proyecto tiene la siguiente estructura de archivos:

- `src/index.js`: Punto de entrada de la aplicación.
- `src/app.js`: Configuración de la aplicación Express.
- `src/config/index.js`: Configuración de la aplicación.
- `src/controllers/index.js`: Controladores para las rutas de la aplicación.
- `src/routes/index.js`: Configuración de las rutas de la aplicación.
- `src/services/index.js`: Servicios para interactuar con los datos de la aplicación.
- `src/models/index.js`: Modelos para los objetos de datos.
- `src/data/index.js`: Almacenamiento de datos en memoria.
- `.env`: Variables de entorno para la aplicación.
- `package.json`: Configuración para npm.

## Instalación

Para instalar las dependencias del proyecto, ejecuta el siguiente comando:

```bash
npm install
```

## Uso

Para iniciar el servidor, ejecuta el siguiente comando:

```bash
npm start
```

El servidor estará escuchando en el puerto especificado en la variable de entorno `PORT`.

## Contribución

Las contribuciones son bienvenidas. Por favor, abre un issue o un pull request para sugerencias o mejoras.

## Licencia

Este proyecto está bajo la licencia MIT.
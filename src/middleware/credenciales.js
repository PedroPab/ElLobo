import parseCookies from "./../utils/parseCookies.js"
import verificarCredenciales from "./../utils/verificarCredenciales.js"

//le pasomod como parametro  la base de tatos
function credenciales(DatabaseNamespace) {

  return (socket, next) => {
    let cookies = socket.handshake.headers.cookie;
    let { nombreUsuario, contrasena } = parseCookies(cookies); // Función para parsear las cookies y obtener el nombre de usuario y la contraseña

    let usuario = verificarCredenciales({ usuario: nombreUsuario, contrasena, Database: DatabaseNamespace });

    if (usuario) {
      // Si las credenciales son válidas, registra el usuario en el socket para su uso posterior
      socket.usuario = usuario;
      next();
    } else {
      // Si las credenciales no son válidas, rechaza la conexión
      next(new Error('Authentication error'));
    }
  }

}

export default credenciales
import parseCookies from "./../utils/parseCookies.js"
import verificarCredenciales from "./../utils/verificarCredenciales.js"

//le pasomod como parametro  la base de tatos
function credenciales({ Database: DatabaseNamespace }) {

  return (socket, next) => {
    let cookies = socket.handshake.headers.cookie;
    let parsedCookies = parseCookies(cookies);

    if (!parsedCookies || !parsedCookies.nombreUsuario || !parsedCookies.contrasena) {
      console.log(`no esta con los datos del usuario`)
      next(new Error('Error parsing cookies, sin los datos de usuario'));
      return;
    }

    let { nombreUsuario, contrasena } = parsedCookies;

    let usuario = verificarCredenciales({
      userName: nombreUsuario,
      password: contrasena,
      Database: DatabaseNamespace
    });

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
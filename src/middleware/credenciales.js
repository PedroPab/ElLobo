import parseCookies from "./../utils/parseCookies.js"
import verificarCredenciales from "./../utils/verificarCredenciales.js"

//le pasomod como parametro  la base de tatos
function credenciales({ Database: DatabaseNamespace }) {

  return (socket, next) => {
    let auth = socket.handshake.auth;
    console.log("🚀 ~ file: credenciales.js:9 ~ return ~ auth:", auth)

    let { userName, password } = auth

    if (!userName || !password) {
      console.log(`no esta con los datos del usuario`)

      next(new Error('Error parsing cookies, sin los datos de usuario'));
      return;
    }

    let usuario = verificarCredenciales({
      userName: userName,
      password: password,
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
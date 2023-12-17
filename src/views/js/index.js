// Conectarse al servidor
const socket = io();

// Escuchar eventos del servidor
socket.on('connect', () => {
  console.log('Conectado al servidor');
});

socket.on('message', (data) => {
  console.log('Mensaje recibido:', data);
});

// Cerrar la conexión
socket.on('disconnect', () => {
  console.log('Desconectado del servidor');
});


const buttonEntrarSala = document.getElementById('buttonEntrarSala')
buttonEntrarSala.addEventListener('click', () => {
  const listInputs = [
    `nombreSala`,
    `nombreUsuario`,
    `contrasena`,
  ]

  const dataForm = listInputs.map(nameInput => obtenerValorInput(nameInput))

  //miramos que los datos si exitan
  if (dataForm.some(dataInput => dataInput == null || dataInput == '')) {
    alert('ESTABLECE LOS CAMPOS!!!')
    console.log(`establece bien los campos`)
    return
  }

  ///establecemos en las cookies el uruario y la contrasena
  document.cookie = `usuario=${dataForm[1]}`
  document.cookie = `contrasena=${dataForm[2]}`

  const url = `/game/${dataForm[0]}`
  window.location.href = url


})

//para poner la sala que aparece en la  url
window.onload = function () {
  // Función para obtener los parámetros de la URL
  function obtenerParametrosDeURL() {
    var parametros = {};
    var partes = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
      parametros[key] = value;
    });
    return parametros;
  }

  // Obtener los parámetros y establecerlos en el formulario
  var parametros = obtenerParametrosDeURL();
  if (parametros.nombreSala) {
    document.getElementById('nombreSala').value = decodeURIComponent(parametros.nombreSala);
  }

};


//function utlis

function obtenerValorInput(nombre) {
  const input = document.querySelector(`input[name="${nombre}"]`);
  return input ? input.value : null;
}
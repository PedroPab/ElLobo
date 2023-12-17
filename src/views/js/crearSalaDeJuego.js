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

socket.on('newSalagameAprob', (data) => {
  console.log('[newSalagameAprob]', data);

  if (!data.create) {
    //no se puedo crear la sala 
    alert(`no se puedo crear la sala ${data.message}`)
    return
  }

  //mandamos al home para que se inicien en el servirdro y ingresen a la sala
  //creamos la url con para ir al home con data.sala
  const url = `/?nombreSala=${data.sala}`
  window.location.href = url

});

const buttonCrearSala = document.getElementById('buttonCrearSala')
buttonCrearSala.addEventListener('click', () => {
  //recojeto el fomulario
  const listInputs = [
    `nombreSala`,
    `contrasenaSala`,
    `tiempoVotacion`,
    `tiempoDiscusion`,
  ]

  const dataForm = listInputs.map(nameInput => obtenerValorInput(nameInput))

  //miramos que los datos si exitan
  if (dataForm.some(dataInput => dataInput == null || dataInput == '')) {
    alert('ESTABLECE LOS CAMPOS!!!')
    console.log(`establece bien los campos`)
    return
  }


  //Como todo esta melo, mandamos la peticion al server
  const rta = {
    nombreSala: dataForm[0],
    contrasenaSala: dataForm[1],
    tiempoVotacion: dataForm[2],
    tiempoDiscusion: dataForm[3],
  }
  socket.emit('newSalaGame', rta);

})


//function utlis

function obtenerValorInput(nombre) {
  const input = document.querySelector(`input[name="${nombre}"]`);
  return input ? input.value : null;
}
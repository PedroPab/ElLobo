const sala = window.location.href.split('/').pop();

// Conectarse al servidor
const socket = io(`/${sala}`);

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

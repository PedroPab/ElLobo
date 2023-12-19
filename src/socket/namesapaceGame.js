
import DataStore from "../data/index.js"
import presente from "../logicGame/presente.js";
import startGame from "../logicGame/startGame.js";
import credenciales from "../middleware/credenciales.js";
import { Server } from 'socket.io'

/**
 * @param {Server} io
 */
const socketServer = (gameIo, dataParty) => {
  //la base de datos de la sala de juego
  const DatabaseNamespace = new DataStore()

  //creamos o miramos si exiet el usuaro apartir de la cookies
  gameIo.use(credenciales({ Database: DatabaseNamespace }));

  gameIo.on('connection', (socket) => {
    console.log(`Un cliente se ha conectado a la  sala de juego ${gameIo.name} con  el usuario de ${socket.usuario}  id: ${socket.id}`);

    socket.on('disconnect', () => {
      console.log(`Un cliente se ha desconectado id: ${socket.id}`);
    });

    //solo cuanod se el admin diga que impiesa empiesa el juego
    socket.on('startGame', async (data) => {
      console.log(`[startGame]`)
      startGame({ Database: DatabaseNamespace, io: gameIo, socket: socket })

    })

    socket.on('openSala', () => {


      //le damos la nuevo usuario los usuariso actuales
      socket.emit('users', [...DatabaseNamespace.listUsers])
    })

    //emitimos que hay un nuevo usuario a todos los demás sockets
    socket.broadcast.emit('newUser', {
      ...socket.usuario
    })

    socket.on('message', (data) => {
      console.log(`[message] `, data)
    })

    //para contar los presentes 
    socket.on('presente', () => {
      presente({ Database: DatabaseNamespace, io: gameIo, socket: socket })
    })


  });



  return gameIo;
};
export default socketServer

import DataStore from "../data/index.js"
import credenciales from "../middleware/credenciales.js";


const socketServer = (gameIo, dataParty) => {
  //la base de datos de la sala de juego
  const DatabaseNamespace = new DataStore()

  //creamos o miramos si exiet el usuaro apartir de la cookies
  gameIo.use(credenciales(DatabaseNamespace));

  gameIo.on('connection', (socket) => {
    console.log(`Un cliente se ha conectado a la  sala de juego ${gameIo.name} con  el usuario de ${socket.usuario}  id: ${socket.id}`);

    console.log("🚀 ~ file: namesapaceGame.js:16 ~ gameIo.on ~ socket.usuario:", socket.usuario)
    socket.on('disconnect', () => {
      console.log(`Un cliente se ha desconectado id: ${socket.id}`);
    });

    //solo cuanod se el admin diga que impiesa empiesa el juego
    socket.on('startGame', () => {
      //verificamos que si hallan los suficiente jugadores
      if (!isGamerMin()) {
        socket.emit('server/startGame', { status: false })
        return
      }





    })


  });

  return gameIo;
};
export default socketServer
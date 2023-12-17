import NamespaceGame from "./namesapaceGame.js";


const socketServer = (io) => {

  io.on('connection', (socket) => {
    console.log(`Un cliente se ha conectado  id: ${socket.id}`);

    socket.on('disconnect', () => {
      console.log(`Un cliente se ha desconectado id: ${socket.id}`);
    });

    //la creacion de una nueva sala de juego que sera un namesapce nuevo
    //la data es todo la infomrcion del juego , modo, tiempos , densos chat activo, etc
    socket.on('newSalaGame', data => {
      const { nombreSala } = data

      console.log(`[newSalaGame], ${nombreSala}`, data)

      //creamos el namesapce seguno la data
      //mira mos si ya exite un namespace con este nombre
      if (io._nsps.get(`/${nombreSala}`)) {
        console.log(`El namespace ${nombreSala} ya existe`);
        socket.emit('newSalagameAprob', { create: false, message: `El namespace ${nombreSala} ya existe` })
        return
      }
      const newSala = io.of(nombreSala)
      socket.emit('newSalagameAprob', {
        create: true,
        message: `El namespace ${nombreSala} se creo bien `,
        sala: nombreSala
      })

      NamespaceGame(newSala, data)
    })

  });

  return io;
};
export default socketServer
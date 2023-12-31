import NamespaceGame from "./namesapaceGame.js";
import { Server } from 'socket.io'

/**
 * @param {Server} io
 */
const socketServer = (io) => {

  io.on('connection', (socket) => {
    console.log(`Un cliente se ha conectado  id: ${socket.id}`);

    socket.on('disconnect', () => {
      console.log(`Un cliente se ha desconectado id: ${socket.id}`);
    });

    //la creacion de una nueva sala de juego que sera un namesapce nuevo
    //la data es todo la infomrcion del juego , modo, tiempos , densos chat activo, etc
    socket.on('newSalaGame', data => {
      const { nombreAldea } = data

      console.log(`[newSalaGame], ${nombreAldea}`, data)

      //creamos el namesapce seguno la data
      //mira mos si ya exite un namespace con este nombre
      if (io._nsps.get(`/${nombreAldea}`)) {
        console.log(`El namespace ${nombreAldea} ya existe`);
        socket.emit('newSalagameAprob', { create: false, message: `El namespace ${nombreAldea} ya existe` })
        return
      }
      const newSala = io.of(nombreAldea)
      socket.emit('newSalagameAprob', {
        create: true,
        message: `El namespace ${nombreAldea} se creo bien `,
        sala: nombreAldea
      })

      NamespaceGame(newSala, data)
    })


  });

  return io;
};
export default socketServer
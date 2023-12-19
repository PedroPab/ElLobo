import isGamerMin from '../utils/isGamerMin.js'
import MessageObj from '../class/messagesObj.js'
import initGame from './initGame.js';
import { Server, Socket } from 'socket.io'

/***
* @param {{
* Database:import('../data/index.js').default,
* io:Server
* socket:Socket
*}} param0 
* @returns 
*/
const startGame = ({ Database, io, socket }) => {
  const message = new MessageObj()

  //verificamos el estado de la aldea
  if (Database.state != Database.LIST_STATES.WAIT_TO_START) {
    console.log('El estado de al partida no es valida, actual ', Database.state);
    message.error('El estado de al partida no es valida')
    socket.emit('messageNotification', message)
    return
  }

  //verificamos que si hallan los suficiente jugadores
  if (!isGamerMin(Database)) {
    message.error('No hay los jugadore suficiente para comenzar')
    socket.emit('messageNotification', message)
    return
  }

  //verificamos  que todo los usuarios esten presentes mandando una confirmacion
  //mandamdo a todos los socket un socket
  io.emit('confirmacionPresencia')

  //ponemos la varible del estado en  REQUESTING_PRESENCE
  Database.state = Database.LIST_STATES.REQUESTING_PRESENCE

  //ponemos un setTimeout para ejecuatar la fuccion que ejecute la siguiente fase del juego  
  const timeLapse = 10000
  setTimeout(() => {
    Database.state = Database.LIST_STATES.INIT_GAME
    initGame({ Database, io, socket })
  }, timeLapse)

  //le damos un rol a cada usuario
  message.success('se mando una validacion de presencia a todo los juagadores el juego comiensa en ' + timeLapse + 's')
  socket.emit('messageNotification', message)

  return

}

export default startGame
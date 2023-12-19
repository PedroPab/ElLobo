import isGamerMin from '../utils/isGamerMin.js'
import MessageObj from '../class/messagesObj.js'

/***
 * @param {{
* Database:import('../data/index.js').default}} param0 
* @returns 
*/
const startGame = ({ Database, io, socket }) => {
  const message = new MessageObj()

  //verificamos el estado de la aldea
  if (Database.state != Database.LIST_STATES.WAIT_TO_START) {
    console.log('El estado de al partida no es valida, actual ', Database.state);
    socket.emit('messageNotification', message.error('El estado de al partida no es valida'))
    return
  }

  //verificamos que si hallan los suficiente jugadores
  if (!isGamerMin(Database)) {
    socket.emit('messageNotification', message.error('No hay los jugadore suficiente para comenzar'))
    return
  }

  //verificamos  que todo los usuarios esten presentes mandando una confirmacion
  //mandamdo a todos los socket un socket
  io.emit('confirmacionPresencia')

  //ponemos la varible del estado en  REQUESTING_PRESENCE
  Database.state = Database.LIST_STATES.REQUESTING_PRESENCE

  //ponemos un setTimeout para ejecuatar la fuccion que ejecute la siguiente fase del juego  
  const timeLapse = 25000
  setTimeout(() => {

  }, timeLapse)

  //le damos un rol a cada usuario
  socket.emit('messageNotification', message.success('se mando una validacion de presencia a todo los juagadores'))
  return

}

export default startGame
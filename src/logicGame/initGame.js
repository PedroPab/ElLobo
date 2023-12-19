import isGamerMin from '../utils/isGamerMin.js'
import MessageObj from '../class/messagesObj.js'
import { Server, Socket } from 'socket.io'
import establecerRoles from '../utils/establecerRoles.js'

/***
* @param {{
* Database:import('../data/index.js').default,
* io:Server
* socket:Socket
*}} param0 
* @returns 
*/
const initGame = ({ Database, io, socket }) => {
  const message = new MessageObj()

  //verificamos el estado de la aldea
  if (Database.state != Database.LIST_STATES.INIT_GAME) {
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


  //le ponemos un rol a cada jugador y segun de su rol en una sala
  establecerRoles({ Database, io })




  // //ponemos un setTimeout para ejecuatar la fuccion que ejecute la siguiente fase del juego  
  // const timeLapse = 25000
  // setTimeout(() => {
  //   //cambiamos el estado del juego 
  //   Database.state = Database.LIST_STATES.INIT_GAME
  //   initGame({ Database, io, socket })
  // }, timeLapse)

  return

}

export default initGame
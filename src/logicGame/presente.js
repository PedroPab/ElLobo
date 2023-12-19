import MessageObj from '../class/messagesObj.js'
import { Server, Socket } from 'socket.io'

/***
* @param {{
* Database:import('../data/index.js').default,
* io:Server
* socket:Socket
*}} param0 
* @returns 
*/
const presente = ({ Database, io, socket }) => {
  const message = new MessageObj()

  //verificamos el estado de la aldea
  if (Database.state != Database.LIST_STATES.REQUESTING_PRESENCE) {
    console.log(`no es nesesario presentarser por que no estamos esperando eso `);
    message.warning('El estado de al partida no es valida')
    socket.emit('messageNotification', message)
    return
  }

  console.log(`el usuario ${socket.usuario.userName} hizo presencia`)

  //lo buscamos en el la base de datos , y lo marcamso como presente
  const indexUser = Database.listUsers.findIndex(user => user.userName == socket.usuario.userName)
  if (indexUser == -1) {
    console.log(`porque rallos no esta en la lista`)
    message.error('porque rallos no esta en la lista')
    socket.emit('messageNotification', message)
    return
  }

  Database.listUsers[indexUser].presenteTrue()

  message.success('Tu presencia fue todo un exito Xd')
  socket.emit('messageNotification', message)

  return
}

export default presente
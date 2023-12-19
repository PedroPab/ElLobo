import MessageObj from '../class/messagesObj.js'

/***
* @param {{
* Database:import('../data/index.js').default,
*io:SocketIO.Socket
*}} param0 
* @returns 
*/
const presente = ({ Database, io, socket }) => {
  const message = new MessageObj()

  //verificamos el estado de la aldea
  if (Database.state != Database.LIST_STATES.REQUESTING_PRESENCE) {
    console.log(`no es nesesario presentarser por que no estamos esperando eso `);
    socket.emit('messageNotification', message.warning('El estado de al partida no es valida'))
    return
  }

  console.log(`el usuario ${socket.usuario.userName} hizo presencia`)

  //lo buscamos en el la base de datos , y lo marcamso como presente
  const indexUser = Database.listUsers.findIndex(user => user.userName == socket.usuario.userName)
  if (indexUser == -1) {
    console.log(`porque rallos no esta en la lista`)
    socket.emit('messageNotification', message.error('porque rallos no esta en la lista'))
    return
  }

  Database.listUsers[indexUser].presenteTrue()
  message.success('Tu presencia fue todo un exito Xd')
  socket.emit('messageNotification', message)
  return
}

export default presente
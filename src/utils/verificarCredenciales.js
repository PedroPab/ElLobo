//Database se refiere a DataStore de data/index.js especificalo   en comentarios JS Doc

import User from '../class/user.js'

/***
 * @param {{
 * nombreUsuario:string,
 * contrasena:string,
 * Database:import('../data/index.js').default}} param0 
 * @returns {User}
 */
function verificarCredenciales({ userName, password, Database }) {
  //miramos si ya hay un usuario con ese nombre
  const userIndex = Database.listUsers.findIndex(element => element.userName == userName && element.password == password)
  if (userIndex == -1) {
    //como no tiene una cuenta , la cremos , como es una prueba por el mometno no improta la contrasena
    const user = new User({
      userName: userName,
      password: password,
    })

    Database.listUsers.push(user)
    return user
  }

  return Database.listUsers[userIndex]
}

export default verificarCredenciales
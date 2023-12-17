//Database se refiere a DataStore de data/index.js especificalo   en comentarios JS Doc
/***
 * @param {{
 * nombreUsuario:string,
 * contrasena:string,
 * Database:import('../data/index.js').default}} param0 
 * @returns 
 */
function verificarCredenciales({ usuario, contrasena, Database }) {
  //miramos si ya hay un usuario con ese nombre
  const userIndex = Database.listUsers.findIndex(element => element.userName == usuario)
  if (userIndex == -1) {
    //como no tiene una cuenta , la cremos , como es una prueba por el mometno no improta la contrasena
    const user = {
      userName: usuario,
      password: contrasena,
      id: Database.listUsers.length + 1,
    }
    Database.listUsers.push(user)
    return user
  }

  return Database.listUsers[userIndex]
}

export default verificarCredenciales
import { listRolesName } from '../class/roles.js'


/***
* @param {{
  * Database:import('../data/index.js').default,
  * io:Server
  *}} param0 
  * @returns 
  */
const establecerRoles = ({ Database, io }) => {
  //filtramso todos lo jugadores que estan presentes
  const listUsers = Database.listUsers.filter(user => user.present == true)

  //le damos un rol cada uno manera aleario 
  const usersLength = listUsers.length
  //funcion para revolver un array de manera aleatoria
  const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

  //revolvemos la lsita  de los usuarios
  const listUsersPresents = shuffle(listUsers)


  //miramos cual edeb de ser la cantidadioa de cada rol y lo poneoms un lista con al misma cantidad que los usuarios
  let roles = [...listUsers]
  roles = roles.map((elemento, i, array) => {
    if (i > usersLength / 2) {
      return listRolesName.VILLAGER
    }
    return listRolesName.WOLF
  })
  console.log("roles de los users", roles)


  //se lo damos a los usuarios
  for (let i = 0; i < usersLength; i++) {
    try {
      listUsersPresents[i].setRole(roles[i])

    } catch (error) {
      console.log(`erorr`, error)

    }
  }

  console.log('los roles se han establecido');

  console.log(listUsersPresents)

  return

}

export default establecerRoles
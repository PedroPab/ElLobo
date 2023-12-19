import { listClassRoles } from "./roles.js";

class User {
  constructor({
    userName,
    password,
  }) {
    this.userName = userName
    this.password = password
    // un id aleatorio
    this.id = Math.random().toString(36).substr(2, 9);
    this.present = false
    this.rol
  }
  presenteTrue() {
    this.present = true
  }
  setRole(rol) {
    //buscamos la clase del rol para tenerlo mucho mejor
    const rolAsign = listClassRoles[rol]

    if (!rolAsign) {
      throw `rol no encontrado ${rol}`
    }

    const data = new rolAsign()

    this.rol = data

  }
}

export default User

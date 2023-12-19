
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
  }
  presenteTrue() {
    this.present = true
  }
}

export default User

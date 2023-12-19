export const listRolesName = {
  WOLF: 'WOLF',
  VILLAGER: 'VILLAGER',
}

export class Rol {
  constructor() {
    this.rol
  }
}

export class Wolf extends Rol {
  constructor() {
    super()
    this.rol = listRolesName.WOLF
  }
}

export class Villager extends Rol {
  constructor() {
    super()
    this.rol = listRolesName.VILLAGER
  }
}

export const listClassRoles = {
  WOLF: Wolf,
  VILLAGER: Villager,
}

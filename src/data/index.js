import User from "../class/user.js";

const LIST_STATES = {
    'WAIT_TO_START': 'WAIT_TO_START',
    'REQUESTING_PRESENCE': 'REQUESTING_PRESENCE',
    'INIT_GAME': 'INIT_GAME'
}

class DataStore {
    constructor() {
        this.LIST_STATES = LIST_STATES
        this.data = [];
        /**
        * @type {User[]} Lista de usuarios. Cada elemento es una instancia de la clase User.
        */
        this.listUsers = []


        //ESTADO DE LA PARTIDAD
        this.state = LIST_STATES['WAIT_TO_START']
    }

    addData(data) {
        this.data.push(data);
    }
    getData() {
        return this.data;
    }
}

export default DataStore;
class DataStore {
    constructor() {
        this.data = [];
        this.listUsers = []

    }

    addData(data) {
        this.data.push(data);
    }

    getData() {
        return this.data;
    }
}

export default DataStore;
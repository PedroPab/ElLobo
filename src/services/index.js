class DataService {
  constructor() {
    this.data = [];
  }

  getAll() {
    return this.data;
  }

  get(id) {
    return this.data.find(item => item.id === id);
  }

  create(item) {
    this.data.push(item);
    return item;
  }

  update(id, item) {
    const index = this.data.findIndex(dataItem => dataItem.id === id);
    if (index !== -1) {
      this.data[index] = item;
    }
    return item;
  }

  delete(id) {
    const index = this.data.findIndex(dataItem => dataItem.id === id);
    if (index !== -1) {
      this.data.splice(index, 1);
    }
  }
}

module.exports = DataService;
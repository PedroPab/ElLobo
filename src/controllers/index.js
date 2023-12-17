class IndexController {
  constructor(dataService) {
    this.dataService = dataService;
  }

  getIndex(req, res) {
    const data = this.dataService.getAll();
    res.json(data);
  }
}

module.exports = IndexController;
const express = require('express');
const router = express.Router();
const IndexController = require('../controllers/index.js');

router.get('/', IndexController.getIndex);

module.exports = router;
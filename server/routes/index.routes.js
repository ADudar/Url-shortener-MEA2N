var express = require('express');
var router = express.Router();
var index = require('../controllers/index.controller');

/* GET home page. */
router.get('/', index.startPage);
router.get('/api', index.apiTest);
router.use (index.notFoungPage) ;
module.exports = router;

var express = require('express')
const controllers = require('../controllers/product.controller');
var router = express.Router()
router.get('/', controllers.products)
router.post('/', controllers.create)
router.put('/', controllers.put)
router.patch('/', controllers.patch)
router.delete('/', controllers.delete)
module.exports = router;
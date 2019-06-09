var express = require('express')
var multer = require('multer')
const controllers = require('../controllers/auth.controller');
var upload = multer({ dest: './public/uploads/' })
var router = express.Router()
router.get('/login', controllers.login)
router.post('/login', controllers.postLogin);
router.get('/createAccount', controllers.create);
router.post('/createAccount', upload.single('avatar'), controllers.postCreate)
module.exports = router;
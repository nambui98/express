var express = require('express')
var multer = require('multer')
    //var cookieParser = require('cookie-parser')
const controllers = require('../controllers/use.controller');
var router = express.Router()
var authMiddleware = require('../middleware/auth.middleware')
var validation = require('../validations/user.validation');
var upload = multer({ dest: './public/uploads/' })
    //router.use(cookieParser())
router.get('/', authMiddleware.requireAuth, controllers.index)
router.get('/search', controllers.search);
router.get('/create', controllers.create)
router.get('/cookie', (req, res, next) => {
    res.cookie('user-id', 123);
    res.send('hello');
})
router.get('/:id', controllers.get)
router.post('/create',
    upload.single('avatar'),
    validation.postCreate,
    controllers.postCreate
)
router.get('/delete/:userId', controllers.delete)
module.exports = router;
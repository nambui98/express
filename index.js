require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL);

var userRoute = require('./routes/user.route');
const cookieParser = require('cookie-parser');
var authRoute = require('./routes/auth.route');
var products = require('./routes/product.route');
var cartRoute = require('./routes/cart.route');
var apiProductRoute = require('./api/routes/product.route')

var authMiddleware = require('./middleware/auth.middleware')
var sesstionMiddleware = require('./middleware/sesstion.middleware');
const app = express();
const post = 3000;
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use('/api/products', apiProductRoute)

app.use(cookieParser(process.env.SECCTION_SECRET))
app.use(sesstionMiddleware)
app.use(express.static('public'))

app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/auth', authRoute)
app.use('/products', products)
app.use('/cart', cartRoute)



app.set('view engine', 'pug');
app.set('views', './views');
app.get('/', (Request, Response) => Response.render('index'))

app.listen(post, () => console.log('server listening on post' + post))
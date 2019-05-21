const express = require('express');

var userRoute = require('./routes/user.route');
const app = express();
const post = 3000;
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use('/users', userRoute);
app.use(express.static('public'))
app.set('view engine', 'pug');
app.set('views', './views');
app.get('/', (Request, Response) => Response.render('index'))
app.listen(post, () => console.log('server listening on post' + post))
const db = require('../db');
const shortid = require('shortid');
const User = require('../model/user.model');
const post = require('../index')
module.exports = {
    index: async(Request, Response) => {
        var users = await User.find();
        Response.render('users/index', {
            users: users
        })
    },
    search: async(Request, Response) => {
        var users = await User.find();
        var q = Request.query.q.toLowerCase();
        var matchedUsers = users.filter((user) => user.name.toLowerCase().indexOf(q) > -1)
        Response.render('users/index', {
            users: matchedUsers,
            q: q

        })

    },
    create: async(req, res) => {
        //console.log('Cookies: ', req.cookies);
        res.render('users/create');
    },
    get: async(req, res) => {
        var id = req.params.id;
        var users = await User.find();
        res.render('users/view', {
            users: users
        })
    },
    postCreate: async(req, res) => {
        console.log(req.params)
        req.body.avatar = req.headers.origin + '/' + req.file.path.split('\\').slice(1).join('/');
        var users = await User.find();
        var user = new User({ name: req.body.name, phone: req.body.phone, avatar: req.body.avatar })
        user.save();
        res.redirect('/users');
    },
    delete: (req, res) => {
        var userId = req.params.userId
        User.find({ _id: userId }).remove().exec();
        res.redirect('/users');
    }
}
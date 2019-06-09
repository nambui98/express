const md5 = require('md5');
const db = require('../db');
const User = require('../model/user.model');
module.exports = {
    login: (Request, Response) => Response.render('auth/login'),
    postLogin: async(req, res) => {
        var email = req.body.email;
        var PassWord = req.body.PassWord;
        var user = await User.find({ email: email });
        if (!user) {
            res.render('auth/login', {
                errors: [
                    'user does not exist.'
                ],
                values: req.body
            });
            return;
        }
        var hashedPW = md5(PassWord)
        if (user[0].PassWord !== hashedPW) {
            res.render('auth/login', {
                errors: [
                    'wrong password.'
                ],
                values: req.body
            });
            return;
        }
        res.cookie('userId', user.id, {
            signed: true
        });
        res.render('auth/thanhtoan');
    },
    create: (req, res) => {
        res.render('auth/createAccount')
    },
    postCreate: async(req, res) => {
        var email = req.body.email;
        var name = req.body.name;
        var phone = req.body.phone;
        var avatar = req.headers.origin + '/' + req.file.path.split('\\').slice(1).join('/');
        var PassWord = md5(req.body.PassWord);

        var user = new User({ name: name, email: email, phone: phone, avatar: avatar, PassWord: PassWord });
        user.save();
        var users = await User.find()
        res.render('users/index', {
            users: users
        })
    }
}
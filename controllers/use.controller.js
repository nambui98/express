const db = require('../db');
const shortid = require('shortid');
module.exports = {
    index: (Request, Response) => Response.render('users/index', {
        users: db.get('users').value()
    }),
    search: (Request, Response) => {
        var q = Request.query.q.toLowerCase();
        console.log(db.get('users').value());
        var matchedUsers = db.get('users').value().filter((users) => users.name.toLowerCase().indexOf(q) > -1)
        console.log(matchedUsers)
        Response.render('users/index', {
            // var q=res.query.q;
            q: q,
            users: matchedUsers
        })

    },
    create: (req, res) => {
        res.render('users/create')
    },
    get: (req, res) => {
        var id = req.params.id;
        var user = db.get('users').find({ id: id }).value();
        res.render('users/view', {
            user: user
        })
    },
    postCreate: (req, res) => {
        req.body.id = shortid.generate();
        db.get('users').push(req.body).write();
        res.redirect('/users');
    }
}
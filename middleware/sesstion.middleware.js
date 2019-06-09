var shortid = require('shortid')
var db = require('../db');
var Sesstion = require('../model/cart.model')
module.exports = function(req, res, next) {
    if (!req.signedCookies.sesstionId) {
        var newsession = new Sesstion({ cart: [] });
        newsession.save(function(err) {
            if (err) return handleError(err);
        });
        res.cookie('sesstionId', newsession.id, {
            signed: true
        })
    }
    next();

}
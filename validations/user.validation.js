module.exports = {
    postCreate: function(req, res, next) {
        var error = []
        if (!req.body.name) {
            error.push('Tên sai')
        }
        if (!req.body.phone) {
            error.push('Số phone sai')
        }
        if (error.length) {
            res.render('users/create', {
                errors: error,
                value: req.body
            })
            return;
        }
        next();
    }
}
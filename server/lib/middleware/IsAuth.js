function isAuth(req, res, next) {
    var session = req.session;
    if (!session.userId) {
        res.send({
            status: 0,
            error: {
                code:    'AUTHORIZATION_REQUIRED',
                message: 'Please, sign in or sign up first'
            }
        });
    }
    next();
}

module.exports = isAuth;
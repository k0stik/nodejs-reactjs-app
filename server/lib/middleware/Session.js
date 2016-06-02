var session = require('express-session');
var FileStore = require('session-file-store')(session);

var sessionMiddleware = session({
    store: new FileStore(),
    secret: 'super secret string',
    resave: true
});

var sessionMiddlewareProxy = function(req, res, next) {
    // skip session middleware in case of OPTIONS request
    // otherwise new sessionID will be generated
    if (req.method != "OPTIONS") {
        return sessionMiddleware(req, res, next);
    }
    next();
};

module.exports = sessionMiddlewareProxy;
module.exports = function(app) {
    var jwt = require('express-jwt');
    var jwks = require('jwks-rsa');
    
    var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://cpaas.auth0.com/.well-known/jwks.json"
    }),
    audience: 'cpaas',
    issuer: "https://cpaas.auth0.com/",
    algorithms: ['RS256']
    });
    
    app.use('/api/subscribers',jwtCheck);
    app.use('/api/phone_numbers',jwtCheck);
};
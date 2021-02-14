const config = require('../config/config');
const jwt = require('jsonwebtoken');
const { authCookie,jwtSecret } = config;

module.exports = function (req, res, next) {
  const token = req.cookies[authCookie];
  if (!token) { next(); return; }
  jwt.verify(token, jwtSecret, function (err, decoded) {
    if (err) { next(err); return; }
    req.user = { _id: decoded.userId };
    res.locals.username = req.user.username;
    res.locals.isLogged = req.user;
    next();
  });
};
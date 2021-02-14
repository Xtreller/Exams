const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        port: process.env.PORT || 3000,
        dbConnectionString: 'mongodb://localhost:27017/examVT',
        authCookie: 'auth_cookie',
        jwtSecret: 'jwtIsCOol',
        saltRounds: 10
    },
    production: {}
};

module.exports = config[env];
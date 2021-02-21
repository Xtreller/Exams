const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        port: process.env.PORT || 3000,
        dbConnectionString: 'mongodb://localhost:27017/examDb',
        jwtSecret:'randS1ring',
        authCookie : 'auth-cookie'
   },
    production: {}
};

module.exports = config[env];
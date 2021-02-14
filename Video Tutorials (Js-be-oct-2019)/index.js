const env = process.env.NODE_ENV || 'development';

const config = require('./config/config');
const app = require('express')();
const dbConnectionPromise = require('./config/database')();

require('./config/express')(app);
require('./config/routes')(app);

dbConnectionPromise.then(() => {
  app.listen(config.port, 
    console.log(`Listening on port ${config.port}! Now its up to you: ` + "http://localhost:3000/"))
});
  
const http = require('http');

const app = require('./app');
const config = require('./config');
const log = require('./log');


// init server instance
const server = http.createServer(app);

server.listen(config.server.port, err => {
    if(err) { 
        log.err('server ', 'could not start listening ', err.message || err );
    process.exit();
}
    log.log('env ', `app starting in "${config.env}" mode...`);
    log.log('server', `Express server is listening on ${config.server.port}...`);
    log.log('api-Base-Path', `${config.apiPath}`);
});

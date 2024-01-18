// get configs from environment
const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 8080;
const ROOT = process.env.root || '';
const apiPath = `${ROOT !== '/' ? ROOT : ''}/api`;
const SECRET = process.env.SECRET || 'secretWord';
const CHAT_PATH = process.env.CHAT_PATH || '/chat-path';



// init config obj containing the app settings
const config = {
    env:NODE_ENV, //specifies the environment in which the application is running (e.g., 'development', 'production', 'test').
    root: ROOT,  // ROOT could represent the root directory or path of the application.
    apiPath,      // define the base path for API routes.
    server: {
        port: PORT
    },
    secret: SECRET,
    chatPath: CHAT_PATH
};

module.exports = config;
const http = require('http');
const dotenv = require('dotenv')
dotenv.config()

const port = process.env.PORT || 3000
const app = require('./app')


const server = http.createServer(app);

server.listen(port)


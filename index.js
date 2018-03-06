let server = require('./server.js'),
    router = require('./router.js'),
    requestHandlers = require('./requestHandlers.js');
let handle = {
    '/': requestHandlers.start,
    '/start': requestHandlers.start,
    '/upload': requestHandlers.upload,
    '/show': requestHandlers.show
};

server.start(router.route, handle);

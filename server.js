let http = require('http'),
    url = require('url');
function start(route, handle){
    http.createServer(function (request, response) {
        let pathname = url.parse(request.url).pathname;
        console.log('request for ' + pathname + ' received.');

        route(handle, pathname, response, request);            

    }).listen(8080);

    console.log('server is started and listening 8080');
}

exports.start = start;



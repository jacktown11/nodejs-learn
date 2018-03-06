let queryString = require('querystring'),
    fs = require('fs'),
    formidable = require('formidable');

function start(response) {
    let body = `
    <html>
    <head>
        <meta http-equiv="Content-Type" content="text/html" charset="UTF-8" />
    </head>
    <body>
        <form style="width: 800px; margin: 20px auto; text-align: center;" action="/upload" 
        method="post" enctype="multipart/form-data">
            <input type="file" name="upload" / value="">
            <input type="submit" value="确认上传" />
        </form>
    </body>
    </html>
    `;

    response.writeHead(200, {
        'Content-Type': 'text/html'
    });
    response.write(body);
    response.end();
} 
function upload(response, request) {
    console.log('request handler "upload" is called.');
    let form = new formidable.IncomingForm();
    console.log('about to parse');
    let ws = fs.createWriteStream('./test.png');

    form.parse(request, function (err, fields, files) {
        ws.end();
        response.writeHead(200, {
            'Content-Type': 'text/html'
        });
        let content = `
            <div style="text-align: center; width: 800px; margin: 40px auto;">
                <p>这是您上传的图片</p>
                <img src="/show">
            </div>
        `;
        response.write(content);
        response.end();
    });

    form.onPart = function (part) {
        part.addListener('data', function (postDataChunk) {
            ws.write(postDataChunk);
        });
    };
}
function show(response){
    console.log('request handler "show" is called.');
    response.writeHead(200, {
        'Content-Type': 'image/png'
    });
    fs.createReadStream('./test.png').pipe(response);
}

exports.start = start;
exports.upload = upload;
exports.show = show;
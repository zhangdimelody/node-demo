var http = require("http");
var url = require("url");
var fs = require("fs");
var path = require("path");
var cheerio = require("cheerio");




var server = http.createServer(function(request, response) {
    // response.on("data", function(chunk){
    //     response.write(chunk)
    // });

    // fs.readFile('./index.html', 'utf-8', function(err, data){
    //     if(err) throw err;
    //     response.writeHead(200, {"Content-Type": "text/html"});
    //     // console.log(data)
    //     response.write(data);
    //     response.end();
    // })

    var pathname = url.parse(request.url).pathname;
    // console.log(url.parse(request.url))


    var realPath = "assets" + pathname;
    fs.exists(realPath, function(exists) {
        // console.log(exists)
        if (!exists) {
            response.writeHead(404, {
                'Content-Type': 'text/plain'
            });
            response.end()
        } else {
            fs.readFile(realPath, 'binary', function(err, file) {
                if (err) {
                    response.writeHead(500, {
                        'Content-Type': 'text-plain'
                    });
                    response.end();
                } else {
                    response.writeHead(200, {
                        'Content-Type': 'text/html'
                    });

                    var id = id || 27884
                    http.get('http://app3.qdaily.com/app3/articles/detail/' + id + '.json', function(resp) {

                        var body = [];
                        resp.on('data', function(chunk) {
                            body.push(chunk);
                        });

                        resp.on('end', function() {
                            body = Buffer.concat(body);
                            var res = body.toString();

                            console.log("22222222222222222222222222222");
                            var html = JSON.parse(res).response.article.body;
                            console.log(html);
                            response.write(html, 'utf-8');
                            response.end();
                        });
                    });
                }
            })
        }
    })

});


server.listen(3000, '127.0.0.1', function(res) {
    console.log("3000")
});
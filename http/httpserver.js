var http = require("http");
var fs  = require("fs");


http.createServer(function(request,response){
	if(request.url == "/index.html" || request.url == "/") {
		response.writeHeader(200,{"Content-Type":"text/html"});
		fs.createReadStream("index.html").pipe(response);
	}
	else if(request.url == "/index.js") {
		response.writeHeader(200,{"Content-Type":"text/javascript"});
		fs.createReadStream("index.js").pipe(response);
	}

}).listen(3000);

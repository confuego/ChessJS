var io = require("socket.io").listen(8080);



io.on("connection",function(socket){
	console.log("Connected!");

	socket.on("disconnect",function() {
		console.log("Disconnected!");
	});
});

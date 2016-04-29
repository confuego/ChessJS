var io = require("socket.io").listen(8080);
var RoomNameSpace = require("./Room");
var UserNameSpace = require("./User");
var BoardNameSpace = require("./Board");
var SocketMap = {};

io.on("connection", function(socket) {
	console.log("Connected!");

	var u = new UserNameSpace.User("Wes",socket);
	SocketMap[socket.id] = u;
	console.log(SocketMap);

	// Only when user wants to make a new room.
	/*var r = new RoomNameSpace.Room(u,new BoardNameSpace.Board());
	console.log(r.Board.board[0][0]);*/

	socket.on("disconnect", function(socket) {
		console.log("Disconnected!");

		delete SocketMap[socket.id];
	});
});

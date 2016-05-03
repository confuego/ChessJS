var io = require("socket.io").listen(8080);
var RoomNameSpace = require("./Room");
var UserNameSpace = require("./User");
var BoardNameSpace = require("./Board");
var SocketMap = {};
var RoomMap = {};

io.on("connection", function(socket) {

	function RefreshRooms() {
		var set = {};

		for(var RoomName in RoomMap) {
			set[RoomName] = RoomMap[RoomName].serialize();
		}

		io.emit("RefreshRooms",set);
	}

	function RemoveUserFromRoom(user) {
		for(var RoomName in RoomMap) {

			var UserList = RoomMap[RoomName].Users;
			var idx = UserList.indexOf(user);

			if(idx > -1) {
				UserList.splice(idx,1);
				socket.broadcast.emit("User Left", {User: "[SERVER]", Msg: user.Name + " has left."});
				if(UserList.length == 0) {
					delete RoomMap[RoomName];
				}
				RefreshRooms();
			}
		}
	}


	socket.on("disconnect", function() {
		var user = SocketMap[this.id];
		RemoveUserFromRoom(user);
		delete SocketMap[this.id];
	});

	socket.on("Create Room", function(RoomName) {

		if(!RoomMap[RoomName]) {
			//console.log(SocketMap[this.id].Name + " is Creating Room " + RoomName + "\n");
			var user = SocketMap[this.id];
			RemoveUserFromRoom(user);


			var r = new RoomNameSpace.Room(RoomName, SocketMap[this.id], new BoardNameSpace.Board());
			RoomMap[RoomName] = r;
			RefreshRooms();
		}

		else {
			//console.log(RoomName + " already exists!\n");
			return false;
		}

	});

	socket.on("Join Room", function(RoomName) {
		if(RoomMap[RoomName]) {
			var UserList = RoomMap[RoomName].Users;

			var idx = UserList.indexOf(SocketMap[this.id]);

			if(idx > -1) {

				//console.log(SocketMap[this.id].Name + " is already in room " + RoomName + "!\n");
				return false;
			}
			else {
				var user = SocketMap[socket.id];
				RemoveUserFromRoom(user);

				RoomMap[RoomName].Users.push(user);
				var name = SocketMap[this.id].Name;
				socket.broadcast.emit("User Joined", { Msg: name + " joined.", User: "[SERVER]" });
				RefreshRooms();

				return true;
			}
		}
		else {
			//console.log("Room " + RoomName + " does not exist!\n");
			return false;
		}

	});

	socket.on("Request Board", function(RoomName) {

		if(RoomMap[RoomName].Users.indexOf(SocketMap[this.id]) <= -1) {
			//console.log("User does not exist in this room!\n");
			return false;
		}
		else
			return Room.Board;
	});

	socket.on("Create User", function(username) {
		if(!SocketMap[this.id]) {

			//console.log(username + " Connected!\n");
			var u = new UserNameSpace.User(username,this.id);
			SocketMap[this.id] = u;
		}
		else {
			console.log("User already exists on this connection!\n");
		}

	});

	socket.on("Send Message", function(MessageStruct) {
		var msg = MessageStruct.Message;
		var room = MessageStruct.Room;
		var Users = RoomMap[room].Users;

		for(var i = 0; i < Users.length; i++) {
			var socket = io.sockets.connected[Users[i].Socket];
			socket.emit("Recieve Message", { Msg: msg, User: SocketMap[this.id].Name });
		}

	});

});

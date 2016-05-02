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

	function RefreshUsers() {
		var set = {};

		for(var Socket in SocketMap) {
			set[Socket] = SocketMap[Socket].serialize();
		}

		io.emit("RefreshUsers", set);
	}

	socket.on("disconnect", function() {
		var user = SocketMap[this.id];
		if(user)
			console.log(user.Name  + " has Disconnected!\n");
		for(var RoomName in RoomMap) {

			var UserList = RoomMap[RoomName].Users;
			var idx = UserList.indexOf(this.id);

			if(idx > -1) {
				UserList.splice(idx,1);
				if(UserList.length == 0) {

					delete RoomMap[RoomName];
				}
			}
		}

		delete SocketMap[this.id];

		RefreshUsers();
	});

	socket.on("Create Room", function(RoomName) {

		if(!RoomMap[RoomName]) {
			console.log(SocketMap[this.id].Name + " is Creating Room " + RoomName + "\n");
			var r = new RoomNameSpace.Room(RoomName, SocketMap[this.id], new BoardNameSpace.Board());
			RoomMap[RoomName] = r;
			RefreshRooms();
		}

		else {
			console.log(RoomName + " already exists!\n");
			return false;
		}

	});

	socket.on("Join Room", function(RoomName) {
		if(RoomMap[RoomName]) {
			var UserList = RoomMap[RoomName].Users;

			var idx = UserList.indexOf(SocketMap[this.id]);

			if(idx > -1) {

				console.log(SocketMap[this.id].Name + " is already in room " + RoomName + "!\n");
				return false;
			}
			else {

				console.log(SocketMap[this.id].Name + " was added to " + RoomName + "\n");

				RoomMap[RoomName].Users.push(SocketMap[socket.id]);
				console.log(RoomName + "'s Users: " + UserList + "\n");

				RefreshRooms();

				return true;
			}
		}
		else {
			console.log("Room " + RoomName + " does not exist!\n");
			return false;
		}

	});

	socket.on("Request Board", function(RoomName) {

		if(RoomMap[RoomName].Users.indexOf(SocketMap[this.id]) <= -1) {
			console.log("User does not exist in this room!\n");
			return false;
		}
		else
			return Room.Board;
	});

	socket.on("Create User", function(username) {
		if(!SocketMap[this.id]) {

			console.log(username + " Connected!\n");
			var u = new UserNameSpace.User(username);
			SocketMap[this.id] = u;
			RefreshUsers();
		}
		else {
			console.log("User already exists on this connection!\n");
		}

	});

});

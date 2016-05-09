var io = require("socket.io").listen(8080);
var RoomNameSpace = require("./Room");
var UserNameSpace = require("./User");
var BoardNameSpace = require("./Board");
var SocketMap = {};
var RoomMap = {};
var MAX_ROOMS = 10;

io.on("connection", function(socket) {

	function RefreshRooms() {
		var set = {};

		for(var RoomName in RoomMap) {
			set[RoomName] = RoomMap[RoomName].serialize();
		}

		io.emit("RefreshRooms",set);
	}

	function SendMessage(MessageStruct) {
		var room = MessageStruct.Room;
		var Socket = MessageStruct.Socket;
		var events = MessageStruct.Events;
		var ErrorMsg = "";

		if(room) {

			var Users = RoomMap[room].Users;

			for(var i = 0; i < Users.length; i++) {

				var socket = io.sockets.connected[Users[i].Socket];
				
				for(var j = 0; j < events.length; j++) {

					socket.emit(events[j].EventType, events[j].Data);

				}

			}
		}

		if( !room ) {
			ErrorMsg = "You are not in a room. ";
		}

		if(ErrorMsg.length > 0) {
			Socket.emit("Recieve Message", { Msg: ErrorMsg, User: "[SERVER]" });
		}
	}

	function RemoveUserFromRoom(user) {
		for(var RoomName in RoomMap) {

			var Users = RoomMap[RoomName].Users;
			var idx = Users.indexOf(user);

			if(idx > -1) {

				Users.splice(idx,1);
				for(var i = 0; i < Users.length; i++) {
					var socket = io.sockets.connected[Users[i].Socket];
					socket.emit("Recieve Message", { User: "[SERVER]", Msg: user.Name + " has left." });
				}

				if(Users.length == 0) {
					delete RoomMap[RoomName];
				}
				RefreshRooms();
			}
		}
	}


	socket.on("disconnect", function() {
		var user = SocketMap[this.id];
		RemoveUserFromRoom(user);
		this.emit("Recieve Message", {User: "[SERVER]", Msg: "You have disconnected"});
		delete SocketMap[this.id];
	});

	socket.on("Create Room", function(RoomName) {
		var RoomNumber = Object.keys(RoomMap).length;

		if(!RoomMap[RoomName] && RoomName && RoomNumber < MAX_ROOMS) {
			var user = SocketMap[this.id];
			RemoveUserFromRoom(user);


			var r = new RoomNameSpace.Room(RoomName, SocketMap[this.id], new BoardNameSpace.Board());
			RoomMap[RoomName] = r;
			RefreshRooms();
		}

		else if(RoomMap[RoomName]) {
			this.emit("Recieve Message", { Msg: RoomName + " already exists", User: "[SERVER]" });
		}

		else if(!RoomName) {
			this.emit("Recieve Message", { Msg: "Invalid Room Name", User: "[SERVER]" });
		}

		else if(RoomNumber >= MAX_ROOMS) {
			this.emit("Recieve Message", { Msg: "Maximum number of rooms has been reached", User: "[SERVER]" });
		}

	});

	socket.on("Join Room", function(RoomName) {
		if(RoomMap[RoomName]) {
			var Room = RoomMap[RoomName];
			var Users = Room.Users;

			var idx = Users.indexOf(SocketMap[this.id]);

			if(idx > -1) {
				this.emit("Recieve Message", { Msg: "You are already in this room", User: "[SERVER]" });
			}
			else if(Users.length >= Room.MaxUsers) {
				this.emit("Recieve Message", { Msg: "The room is currently full", User: "[SERVER]" });
			}
			else {

				var user = SocketMap[this.id];
				RemoveUserFromRoom(user);

				var name = SocketMap[this.id].Name;
				this.emit("Recieve Message", { Msg: "Joined " + RoomName, User: "[SERVER]" });
				SendMessage({ Socket: this, Room: RoomName, Events: [ { EventType: "Recieve Message", Data: { Msg: name + " has joined", User: "[SERVER]" } } ] });

				Users.push(user);
				if(Users.length == Room.MaxPlayers) {

					Room.SetColors();

					for(var i = 0; i < Users.length; i++) {

						var socket = io.sockets.connected[Users[i].Socket];
						var color  = (Users[i].Color == 0)? "Black." : "White.";

						socket.emit("Recieve Color", { Msg: "You are " + color, User: "[SERVER]", Color: Users[i].Color, ColorEnum: BoardNameSpace.ColorEnum });
					}

					SendMessage({ Socket: this, Room: RoomName, Events: 
																		[
																			{ EventType: "Initialize Board", Data: { Msg: "Initializing Board ", User: "[SERVER]", Board: Room.Board, PieceEnum: BoardNameSpace.PieceEnum } } 
																		] 
								});

				}
				RefreshRooms();
			}
		}
		else {
			socket.emit("Recieve Message", { Msg: RoomName + " does not exist", User: "[SERVER]" });
		}

	});

	socket.on("Create User", function(username) {
		if(!SocketMap[this.id]) {

			var u = new UserNameSpace.User(username, this.id);
			SocketMap[this.id] = u;
			RefreshRooms();
		}
		else {
			socket.emit("Recieve Message", { Msg: "User already exists on this connection", User: "[SERVER]" });
		}

	});

	socket.on("Send Message", function(MessageStruct) {

		SendMessage({
						Socket: this, 
						Room: MessageStruct.Room,
						Events: [
									{ EventType: "Recieve Message", Data: { Msg: MessageStruct.Message, User: SocketMap[this.id].Name } }
								] 
					});
	});



});

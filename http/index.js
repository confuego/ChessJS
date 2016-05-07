
window.onload = function() {

	function CreateBoard(div) {
		var table = document.createElement("table");
		table.id = "chess_board";

		for(var i = 0; i < 8; i++) {

			var row = document.createElement("tr");

			for(var j = 0; j < 8; j++) {
				var cell = document.createElement("td");
				cell.id = i.toString() + "-" + j.toString();
				row.appendChild(cell);
			}
			table.appendChild(row);

		}

		document.getElementById(div).appendChild(table);
	}

	var socket = io.connect("http://10.0.226.89:8080", { resource: "nodejs" });
	var CurrentRoom = null;

	document.getElementById("CreateRoom").addEventListener("click", function() {
		var CreateRoom = document.getElementById("CreateRoom");
		CreateRoom.innerText = "";
		var input = document.createElement("input");

		input.addEventListener("keydown", function(e) {

			if(e.keyCode == 13) {
				CurrentRoom = input.value;
				socket.emit("Create Room", CurrentRoom);
				input.blur();
				ClearChildren(document.getElementById("ChatArea"));
				AddChatMessage("Joined " + CurrentRoom, "[SERVER]: ", document.getElementById("ChatArea"));
			}

		});

		input.addEventListener("blur", function() {
			var room = document.getElementById("CreateRoom");
			ClearChildren(room);
			room.innerText = "Create A Room";
		});

		CreateRoom.appendChild(input);
		input.focus();
	});

	document.getElementById("UserName").addEventListener("keydown", function(e) {

		if(e.keyCode == 13) {
			var user = document.getElementById("UserName").value;

			if(user) {
				socket.emit("Create User", user);
				document.getElementById("UserName").style.visibility = "hidden";
				document.getElementById("CommunicationDiv").style.visibility = "visible";
			}
		}

	});

	function ClearChildren(Node) {

		while (Node.firstChild) {
		    Node.removeChild(Node.firstChild);
		}
	}

	socket.on("RefreshRooms", function(RoomMap) {

		var RoomList = document.getElementById("Rooms");
		ClearChildren(RoomList);

		for(var RoomName in RoomMap) {
			var li = document.createElement("li");
			li.innerText = RoomName;

			li.addEventListener("click", function() {
				CurrentRoom = this.innerText;
				socket.emit("Join Room", CurrentRoom);
				ClearChildren(document.getElementById("ChatArea"));
			});

			RoomList.appendChild(li);
		}

	});

	document.getElementById("TypeArea").addEventListener("keydown", function(e) {
		if(e.keyCode == 13) {
			var input = document.getElementById("TypeArea");
			socket.emit("Send Message", { Message: input.value, Room: CurrentRoom });
			input.value = null;
		}

	});

	function AddChatMessage(Msg,User,messagelist) {
		var li = document.createElement("li");

		var span = document.createElement("span");
		span.innerText = Msg;

		var label = document.createElement("label");
		label.innerText = User;

		li.appendChild(label);
		li.appendChild(span);
		messagelist.appendChild(li);
	}

	socket.on("Recieve Message", function(MsgStruct) {
		AddChatMessage(MsgStruct.Msg, MsgStruct.User+ ": ",document.getElementById("ChatArea"));
	});

	socket.on("Initialize Board", function(BoardStruct) {
		CreateBoard("chess");
	});
};



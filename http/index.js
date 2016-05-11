
window.onload = function() {

	var socket = io.connect("http://10.0.226.89:8080", { resource: "nodejs" });
	var CurrentRoom = null;
	var CurrentColor = null;
	var ColorEnum = null;
	var PieceEnum = null;
	var prevX = null;
	var prevY = null;
	var currX = null;
	var currY = null;

	document.getElementById("UserName").focus();

	function CreateBoard(div, reverse) {
		var table = document.createElement("table");
		table.id = "chess_board";

		if(reverse == true) {

			for(var i = 7; i >= 0; i--) {

				var row = document.createElement("tr");

				for(var j = 7; j >= 0; j--) {
					var cell = document.createElement("td");
					cell.id = i.toString() + j.toString();
					row.appendChild(cell);
				}
				table.appendChild(row);

			}
		}
		else {

			for(var i = 0; i < 8; i++) {

				var row = document.createElement("tr");

				for(var j = 0; j < 8; j++) {
					var cell = document.createElement("td");
					cell.id = i.toString() + j.toString();
					row.appendChild(cell);
				}
				table.appendChild(row);

			}

		}


		document.getElementById(div).appendChild(table);
	}


	function ClearChildren(Node) {

		while (Node.firstChild) {
		    Node.removeChild(Node.firstChild);
		}
	}

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

	function BindBoard(board) {
		for(var i = 0; i < board.length; i++) {

			for(var j = 0; j < board.length; j++) {


				var cell = document.getElementById(i.toString()+j.toString());
				var a = document.createElement("a");

				if(board[i][i]) 
					a.innerHTML = board[i][j].Img;

				a.draggable = true;

				a.addEventListener("dragstart", function(e) {

					var coords = e.currentTarget.parentNode.id.split("");
					prevX = coords[0];
					prevY = coords[1];
					//console.log(prevX + "-" + prevY);
				}, false);

				a.addEventListener("dragover",function(e) {
					e.preventDefault();
				}, false);

				a.addEventListener("drop",function(e) {

					e.preventDefault();
					var coords = e.toElement.parentNode.id.split("");

					currX = coords[0];
					currY = coords[1];
					// socket emit event to check board
					// on return, call this logic if valid move
					var from = document.getElementById(prevX.toString() + prevY.toString());
					var piece = from.firstChild.innerHTML;
					e.toElement.innerHTML = piece;
					ClearChildren(from.firstChild);
					

				}, false);

				cell.appendChild(a);

			}

		}
	}

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

	socket.on("Recieve Message", function(MsgStruct) {
		AddChatMessage(MsgStruct.Msg, MsgStruct.User + ": ",document.getElementById("ChatArea"));
	});

	socket.on("Recieve Color", function(ColorStruct) {
		// store color
		CurrentColor = ColorStruct.Color;
		ColorEnum = ColorStruct.ColorEnum;
		AddChatMessage(ColorStruct.Msg, ColorStruct.User + ": ", document.getElementById("ChatArea"));

	});

	socket.on("Initialize Board", function(BoardStruct) {
		//check color
		//bind board to screen and flip based on color.
		PieceEnum = BoardStruct.PieceEnum;
		AddChatMessage(BoardStruct.Msg, BoardStruct.User + ": ", document.getElementById("ChatArea"));
		if(CurrentColor == ColorEnum.Black)
			CreateBoard("chess",true);
		else
			CreateBoard("chess",false);

		console.log(BoardStruct.Board);

		BindBoard(BoardStruct.Board.board);

	});
};



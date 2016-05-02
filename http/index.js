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

	document.getElementById("chess").appendChild(table);
}

window.onload = function() {

	var socket = io.connect("http://10.0.226.89:8080", {resource: "nodejs"});

	document.getElementById("HandleButton").addEventListener("click", function() {

		var user = document.getElementById("Handle").value;

		if(user)
			socket.emit("Create User", user); 
	});

	document.getElementById("CreateRoom").addEventListener("click", function() {

		socket.emit("Create Room",document.getElementById("CreateRoomName").value);
	});

	document.getElementById("JoinRoom").addEventListener("click",function() {
		socket.emit("Join Room",document.getElementById("JoinRoomName").value);
	});

	function ClearChildren(Node) {

		while (Node.firstChild) {
		    Node.removeChild(Node.firstChild);
		}
	}

	function CreateGrid(Map,Node,Ignore) {
		var table = document.createElement("table");
		var keys  = Object.keys(Map);
		var obj = Map[keys[0]];

		for(var attr in obj) {
			if(Ignore.indexOf(attr) <= -1) {
				var header = document.createElement("th");
				header.innerText = attr;
				table.appendChild(header);
			}
		}

		for(var key in Map) {

			var tr = document.createElement("tr");
			var obj = Map[key];

			for(var attr in obj) {
				if(Ignore.indexOf(attr) <= -1) {

					var td = document.createElement("td");
					td.innerText = JSON.stringify(obj[attr]);

					tr.appendChild(td);
				}
			}

			table.appendChild(tr);
		}

		Node.appendChild(table);
	}

	socket.on("RefreshUsers", function(SocketMap) {

		var UserNode = document.getElementById("UserGrid");
		ClearChildren(UserNode);
		CreateGrid(SocketMap,UserNode,[]);

	});

	socket.on("RefreshRooms", function(RoomMap) {
		var RoomNode = document.getElementById("RoomGrid");
		ClearChildren(RoomNode);
		CreateGrid(RoomMap,RoomNode,["Board"]);
	});

};



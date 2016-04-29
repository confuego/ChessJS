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

var socket = io.connect("http://localhost:8080", {resource: "nodejs"});


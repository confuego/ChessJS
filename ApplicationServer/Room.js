function Room(name,user,board) {
	this.Board =  board;
	this.Name = name;

	this.Users = new Array();
	this.Users.push(user);
}

Room.prototype = {
	Name: undefined,
	Users: undefined,
	Board: undefined,
	MaxUsers: 10,
	MaxPlayers: 2,
	serialize: function() {
		return { Name: this.Name, Users: this.Users, Board: this.Board };
	},

	SetColors: function() {
		var PieceColor = Math.round(Math.random() * 1);
		this.Users[0].Color = PieceColor;
		
		if(PieceColor == 0) {
			this.Users[1].Color = 1;
		}
		else {
			this.Users[1].Color = 0;
		}

	}
};

Room.prototype.constructor = Room;

module.exports.Room = Room;
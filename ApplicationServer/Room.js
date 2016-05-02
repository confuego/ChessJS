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

	serialize: function() {
		return {Name: this.Name, Users: this.Users, Board: this.Board};
	}
};

Room.prototype.constructor = Room;

module.exports.Room = Room;
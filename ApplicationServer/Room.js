function Room(user,board) {
	this.Users.push(user);
	this.Board =  board;
}

Room.prototype = {
	Users: [],
	Board: undefined,
};

Room.prototype.constructor = Room;

module.exports.Room = Room;
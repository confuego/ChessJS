function User(name,socket) {
	this.Name = name;
	this.socket = socket.id;
}

User.prototype = {
	Name: undefined,
	Socket: undefined,
};

User.prototype.constructor = User;

module.exports.User = User;
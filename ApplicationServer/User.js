function User(name,socket) {
	this.Name = name;
	this.Socket = socket;
}

User.prototype = {
	Name: undefined,
	Socket: undefined,
	serialize: function() {
		return { Name: this.Name };
	}
};

User.prototype.constructor = User;

module.exports.User = User;
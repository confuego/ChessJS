function User(name) {
	this.Name = name;
}

User.prototype = {
	Name: undefined,

	serialize: function() {
		return { Name: this.Name };
	}
};

User.prototype.constructor = User;

module.exports.User = User;
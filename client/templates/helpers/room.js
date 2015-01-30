Template.room.helpers({
	chores: function () {
		if (this) {
			return Chores.find({room: this.toString()});
		}
	}
});

Template.room.helpers({
	room: function () {
		if (this) {
			return this.toString();
		}
	},
	chores: function () {
		if (this) {
			return Chores.find({room: this.toString()});
		}
	}
});

Template.roomByHousemate.rendered = function () {
	var that = this;
	Deps.autorun(function () {
		calcAndRenderRoomDoughnut(that.data);
	});

};


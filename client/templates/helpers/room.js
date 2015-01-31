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
	var house = Session.get("house");
	if (this && house) {
		var housemateIds = Object.keys(house.members);

		var chartData = [];
		var choresInRoom = Chores.find({room: this.data}).fetch();
		var colorsIndex = 0;
		housemateIds.forEach(function (val) {
			var total = 0;
			choresInRoom.forEach(function (chore) {
				total = total + Completed.find({$and: [{chore: chore._id}, {user: val}]}).count();
			});
			if (total) {
				chartData.push({
					value: total,
					color: colors[colorsIndex].color,
					highlight: colors[colorsIndex].highlight,
					label: house.members[val]
				});
				colorsIndex++;
				if(colorsIndex > colors.length) colorsIndex = 0;
			}
		});

		// Get the context of the canvas element we want to select
		var ctx = document.getElementById("room-doughnut-chart").getContext("2d");

		new Chart(ctx).Doughnut(chartData,null);
	}
};


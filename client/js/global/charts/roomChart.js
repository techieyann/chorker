calcAndRenderRoomDoughnut = function (data) {
	var house = Session.get("house");
	if (data && house) {
		var housemateIds = Object.keys(house.members);

		var chartData = [];
		var choresInRoom = Chores.find({room: data}).fetch();
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
		var ctx = document.getElementById("room-doughnut-chart")
		if (ctx) {
			new Chart(ctx.getContext("2d")).Doughnut(chartData,null);
		}
	}
};

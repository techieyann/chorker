renderRoomDoughnutChart = function (chartData) {
	var roomDoughnutChart = document.getElementById("room-doughnut-chart")
	if (roomDoughnutChart && chartData) {
		new Chart(roomDoughnutChart.getContext("2d")).Doughnut(chartData,null);
	}
};

calcRoomDoughnutChart = function (chores) {
	var house = Session.get("house");
	if (chores && house) {
		var housemateIds = Object.keys(house.members);

		var chartData = [];
		var colorsIndex = 0;
		housemateIds.forEach(function (val) {
			var total = 0;
			chores.forEach(function (chore) {
				total = total + timelyCompleted([{chore: chore._id}, {user: val}]).count();
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
		return chartData;
	}
};

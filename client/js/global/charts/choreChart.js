renderChoreDoughnutChart = function (chartData) {

	// Get the context of the canvas element we want to select
	var choreDoughnutChart = document.getElementById("chore-doughnut-chart");
	if (choreDoughnutChart) {
		new Chart(choreDoughnutChart.getContext("2d")).Doughnut(chartData,null);
	}

};

calcChoreDoughnutChart = function (choreId) {
	var house = Session.get("house");
	if (choreId && house) {

		var housemateIds = Object.keys(house.members);
		var chartData = [];
		var colorsIndex = 0;
		housemateIds.forEach(function (val) {
			var total = timelyCompleted([{chore: choreId}, {user: val}]).count();

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

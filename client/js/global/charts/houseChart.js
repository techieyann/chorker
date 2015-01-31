calcAndRenderHouseDoughnut = function () {
	var house = Session.get("house");
	if (this && house) {

		var housemateIds = Object.keys(house.members);

		var chartData = [];
		var colorsIndex = 0;
		housemateIds.forEach(function (val) {
			var total = Completed.find({user: val}).count();			

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
		var ctx = document.getElementById("house-doughnut-chart");
		if(ctx) {
			new Chart(ctx.getContext("2d")).Doughnut(chartData,null);
		}
	}
};

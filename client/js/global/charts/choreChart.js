calcAndRenderChoreDoughnut = function (data) {
	var house = Session.get("house");
	if (data && house) {

		var housemateIds = Object.keys(house.members);
		var choreId = data._id;
		var chartData = [];
		var colorsIndex = 0;
		housemateIds.forEach(function (val) {
			var total = Completed.find({$and: [{chore: choreId}, {user: val}]}).count();			

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
		var ctx = document.getElementById("chore-doughnut-chart");
		if (ctx) {
			new Chart(ctx.getContext("2d")).Doughnut(chartData,null);
		}
	}
};

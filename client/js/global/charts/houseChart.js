calcHouseDoughnutChart = function () {
	var house = Session.get("house");
	if (house) {
		var housemateIds = Object.keys(house.members);
		var chartData = [];
		var colorsIndex = 0;
		housemateIds.forEach(function (val) {
			var total = timelyCompleted([{user: val}]).count();			
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

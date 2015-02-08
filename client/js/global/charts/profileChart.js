calcProfileBarChart = function (userId) {
	var house = Session.get("house");
	if (house) {
		var rooms = house.rooms;
		rooms.push({name: 'misc'});
		var chartLabels = [];
		var chartData = [];
		rooms.forEach(function (val) {
			var chores = Chores.find({room: val.name});
			var total = 0;
			chores.forEach(function (val) {
				var choresCompleted = timelyCompleted([{user: userId}, {chore: val._id}]);
				total = total + choresCompleted.count();
			});
			if (total) {
				chartLabels.push(val.name);
				chartData.push(total);
			}
		});
		if (chartData.length) {
			return {
				labels: chartLabels,
				data: chartData
			}
		}
	}
	return {};

};

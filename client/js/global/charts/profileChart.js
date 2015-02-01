renderProfileBarChart = function (chartData) {
	var roomBarChart = document.getElementById("room-bar-chart");
	if (roomBarChart && chartData.data) {
		var chartObj = {
			labels: chartData.labels,
			datasets: [{
				fillColor: "rgba(151,187,205,0.5)",
				strokeColor: "rgba(151,187,205,0.8)",
				highlightFill: "rgba(151,187,205,0.75)",
				highlightStroke: "rgba(151,187,205,1)",
				data: chartData.data
			}]
		};
		new Chart(roomBarChart.getContext("2d")).Bar(chartObj, null);
	}
};


calcProfileBarChart = function (userId) {
	var house = Session.get("house");
	if (house) {
		var rooms = house.rooms;
		rooms.push({name: 'other'});
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

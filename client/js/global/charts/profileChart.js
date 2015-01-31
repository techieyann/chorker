calcAndRenderProfileBar = function (data) {

	var house = Session.get("house");
	if (house && data) {
		var userId = data.id;
		var rooms = house.rooms;
		rooms.push({name: 'other'});
		var labels = [];
		var data = [];
		rooms.forEach(function (val) {
			var chores = Chores.find({room: val.name});
			var total = 0;
			chores.forEach(function (val) {
				total = total + Completed.find({$and : [{user: userId}, {chore: val._id}]}).count();
			});
			if (total) {
				labels.push(val.name);
				data.push(total);
			}
		});
		var chartData = {
			labels: labels,
			datasets: [{
        fillColor: "rgba(151,187,205,0.5)",
        strokeColor: "rgba(151,187,205,0.8)",
        highlightFill: "rgba(151,187,205,0.75)",
        highlightStroke: "rgba(151,187,205,1)",
				data: data
			}]
		};

		// Get the context of the canvas element we want to select
		var ctx = document.getElementById("room-bar-chart");
		if (ctx) {
			new Chart(ctx.getContext("2d")).Bar(chartData, null);
		}
	}
};

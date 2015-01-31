Template.house.helpers({
	houseName: function () {
		if (Session.get("house")) return Session.get("house").name;
	},
	houseId: function () {
		if (Session.get("house")) return Session.get("house")._id;
	},
	isOwner: function () {
		if (Session.get("house")) {
			return (Session.get("house").owner == Meteor.user()._id);
		}
		return false;
	}
});


Template.houseByHousemate.rendered = function () {
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
		var ctx = document.getElementById("house-doughnut-chart").getContext("2d");

		new Chart(ctx).Doughnut(chartData,null);
	}
};

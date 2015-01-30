Template.profile.helpers({
	initialized: function () {
		if (Meteor.user()) {
			if (Meteor.user().profile.initialized) {
				return true;
			}
		}
		return false;
	}
});

Template.profileReporting.helpers({
	completed: function () {
		if (this) return this;
	},
	chore: function () {
		if (this) {
			return Chores.findOne(this.chore);
		}
	}
});


Template.profileReporting.rendered = function () {

	var house = Session.get("house");
	if (house && Meteor.user()) {
		var userId = Meteor.user()._id;
		var rooms = house.rooms;
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
		var ctx = document.getElementById("room-bar-chart").getContext("2d");

		new Chart(ctx).Bar(chartData, null);
	}

};


changeUsernameModal = function () {
	openModal('usernameModalHeader','usernameForm','', null);
	Meteor.setTimeout(function(){$('#username-input').focus();},500);
};

Template.profile.events = {
	'click #change-username': changeUsernameModal
};


Template.userInit.helpers({
	houses: function () {
		if (this) return this;
	}
});

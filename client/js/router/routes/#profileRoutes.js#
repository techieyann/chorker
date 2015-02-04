Router.map(function () {
	this.route('profile', {
		path: '/profile',
		controller: 'RegisteredController',
		data: function () {
			if (Meteor.user()) {
				var userId = Meteor.user()._id;
				var username = Meteor.user().profile.username;
				if (!username) username = Meteor.user().emails[0].address;
				var completedChores = timelyCompleted([{user: userId}]);
				var completedArray = [];
				completedChores.forEach( function (val) {
					var choreId = val.chore;
					val.chore = Chores.findOne(choreId);
					completedArray.push(val);
				});
				return {
					id: userId,
					username: username,
					completed: completedArray,
					chart: calcProfileBarChart(userId)
				};
			}
		}
	});
	this.route('housemateProfile', {
		path: '/profile/:_id',
		controller: 'RegisteredController',
		data: function () {
			var userId = this.params._id;
			var house = Session.get("house");
			if (house) {
				var username = house.members[userId];
				var completedChores = timelyCompleted([{user: userId}]);
				var completedArray = [];
				completedChores.forEach( function (val) {
					var choreId = val.chore;
					val.chore = Chores.findOne(choreId);
					completedArray.push(val);
				});
				return {
					id: userId,
					username: username,
					completed: completedArray,
					chart: calcProfileBarChart(userId)
				};
			}
		}
	});
});

Router.map(function () {
	this.route('profile', {
		path: '/profile',
		controller: 'RegisteredController',
		data: function () {
			if (Meteor.user()) {
				var userId = Meteor.user()._id;
				var completedChores = timelyCompleted([{user: userId}]);
				var completedArray = [];
				completedChores.forEach( function (val) {
					var choreId = val.chore;
					val.chore = Chores.findOne(choreId);
					completedArray.push(val);
				});
				return {
					id: userId,
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
				var completedChores = timelyCompleted([{user: userId}]);
				var completedArray = [];
				completedChores.forEach( function (val) {
					var choreId = val.chore;
					val.chore = Chores.findOne(choreId);
					completedArray.push(val);
				});
			return {
				id: userId,
				completed: completedArray,
				chart: calcProfileBarChart(userId)
			};
		}
	});
});

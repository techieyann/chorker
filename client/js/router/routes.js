Router.map(function () {
	this.route('userInit', {
		path: '/init',
		controller: 'BaseController',
		subscription: function () {
			this.subscribe('houses');
		},
		waitOn: function () {
			return Meteor.subscribe('houses');
		},
		data: function () {
			return {
				houses: Houses.find()
			};
		}
	});
	this.route('welcome', {
		path: '/',
		controller: 'BaseController'
	});
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
			return {
				id: userId,
				completed: timelyCompleted([{user: userId}]),
				chart: calcProfileBarChart(userId)
			};
		}
	});
	this.route('house', {
		path: '/house',
		controller: 'RegisteredController',
		data: function () {
				return Chores.find();
		}
	});
	this.route('manageHouse', {
		path: '/house/:_id',
		controller: 'RegisteredController',
		data: function () {
			return Houses.findOne();
		}
	});
	this.route('room', {
		path: '/house/room/:room',
		controller: 'RegisteredController',
		data: function () {
			return this.params.room.replace('-',' ');
		}
	});
	this.route('chores', {
		path:'/chores',
		controller: 'RegisteredController',
		data: function () {
			return Chores.find();
		}
	});
	this.route('chore', {
		path:'/chores/:_id',
		controller: 'RegisteredController',
		data: function () {
			return Chores.findOne({_id: this.params._id});
		}
	});
});

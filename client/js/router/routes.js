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
			return Houses.find();
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
				return {
					id: Meteor.user()._id,
					completed: Completed.find({user: Meteor.user()._id})
				};
			}
		}
	});
	this.route('housemateProfile', {
		path: '/profile/:_id',
		controller: 'RegisteredController',
		data: function () {
			return {
				id: this.params._id,
				completed: Completed.find({user: this.params._id})
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

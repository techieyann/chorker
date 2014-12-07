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
		controller: 'RegisteredController'
	});
	this.route('house', {
		path: '/house',
		controller: 'RegisteredController',
		data: function () {
			var house = Session.get("house");
			if (house) {
					return Chores.find({house_id: house._id});
				}
			
		}
	});
	this.route('manageHouse', {
		path: '/house/:_id',
		controller: 'RegisteredController',
		data: function () {
			return Houses.findOne(this.params._id);
		}
	});
	this.route('chores', {
		path:'/chores',
		controller: 'RegisteredController',
		data: function () {
			var house = Session.get("house");
			if (house) {
					return Chores.find({house_id: house._id});
				}
			
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

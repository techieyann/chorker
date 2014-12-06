Router.map(function () {
	this.route('userInit', {
		path: '/init',
		controller: 'RegisteredController',
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
	this.route('house', {
		path: '/house',
		controller: 'RegisteredController',
		waitOn: function () {
			if (Meteor.user()) {
				if (Meteor.user().profile.initialized) {
					var houseId = Meteor.user().profile.house;
					Meteor.subscribe('houses', houseId);
					Session.set('house', Houses.findOne({_id: houseId}));
					return Meteor.subscribe('chores', houseId); 
				}
			}
		},
		data: function () {
			if (Meteor.user()) {
				if (Meteor.user().profile.initialized) {
					return Chores.find({house: Meteor.user().profile.house});
				}
			}
		}
	});
	this.route('manageHouse', {
		path: '/house/:_id',
		controller: 'RegisteredController',
		waitOn: function () {
			return Meteor.subscribe('houses', this.params._id);
		},
		data: function () {
			return Houses.findOne(this.params._id);
		}
	});
	this.route('chores', {
		path:'/chores',
		controller: 'RegisteredController',
		waitOn: function () {
			if (Meteor.user()) {
				if (Meteor.user().profile.initialized) {
					return Meteor.subscribe('chores', Meteor.user().profile.house); 
				}
			}
		},
		data: function () {
			if (Meteor.user()) {
				if (Meteor.user().profile.initialized) {
					return Chores.find({house: Meteor.user().profile.house});
				}
			}
		}
	});
	this.route('chore', {
		path:'/chores/:_id',
		controller: 'RegisteredController'
	});
});

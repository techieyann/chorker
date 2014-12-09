BaseController = RouteController.extend({
	onBeforeAction: function () {
		Session.set('route', this.route._path);
		this.next();
	}
});

RegisteredController = BaseController.extend({
	subscriptions: function () {

		if (Meteor.user()) {
			if (Meteor.user().profile.initialized) {
				var houseId = Meteor.user().profile.house;
				this.wait(Meteor.subscribe('houses', houseId));
				this.wait(Meteor.subscribe('completed', houseId));
				this.wait(Meteor.subscribe('chores', houseId)); 
				if(this.ready()) {
					Session.set("house", Houses.findOne(houseId));
					this.render();
				}
			}
		}
		this.render('loading');


	}
});

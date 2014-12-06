BaseController = RouteController.extend({
	onBeforeAction: function () {
		Session.set('route', this.route._path);
		clearAlert();
		this.next();
	}
});

RegisteredController = BaseController.extend({
	onBeforeAction: function () {
		if (Meteor.user()) {
			if (Meteor.user().profile.initialized) {
				Session.set("house", Houses.findOne(Meteor.user().profile.house));
		 }
			this.next();
		}
		else {
			alert("info", "please login to access this page");
			Router.go("welcome");
		}
	}
});

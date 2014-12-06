BaseController = RouteController.extend({
	onBeforeAction: function () {
		Session.set('route', this.route._path);
		this.next();
	}
});

RegisteredController = BaseController.extend({
	onBeforeAction: function () {
		if (Meteor.user()) {
			this.next();
}
else {
	alert("info", "please login to access this page");
	Router.go("welcome");
}
	}
});

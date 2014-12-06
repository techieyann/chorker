Meteor.startup(function () {
	Session.setDefault("currentRoute", null);
	Session.setDefault("alertMessage", null);
	Session.setDefault("house", null);
});

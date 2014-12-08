Meteor.startup(function () {
	Session.setDefault("currentRoute", null);
	Session.setDefault("alertMessage", null);
	Session.setDefault("house", null);
	Session.setDefault("choreFiltersActive", false);
	Session.setDefault("choreFilters", {});
	Session.setDefault("choreTimers", {});
	Session.setDefault("choreSearchQuery", '');
});

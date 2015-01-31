Meteor.startup(function () {
	Session.setDefault("currentRoute", null);
	Session.setDefault("alertMessage", null);
	Session.setDefault("house", null);
	Session.setDefault("choreFiltersActive", false);
	Session.setDefault("choreFilters", {});
	Session.setDefault("choreTimers", {});
	Session.setDefault("choreSearchQuery", '');

	var start = moment().subtract(1, 'months').format('MM/DD/YYYY');
	var end = moment().add(1, 'days').format('MM/DD/YYYY');

	filter = {
		filter: 'month',
		range: {
			from: start,
			to: end
		}
	};
	Session.setDefault("timeFilter", filter);
});

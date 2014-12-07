Template.recentChores.helpers({
	chores: function () {
		return Chores.find({},{sort: {last_completed: -1}}, {limit: 5});
	}
});
Template.leastRecentChores.helpers({
	chores: function () {
		return Chores.find({},{sort: {last_completed: 1}}, {limit: 5});
	}
});

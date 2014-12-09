Template.housemates.helpers({
	housemate: function () {
		var members = Houses.findOne(Meteor.user().profile.house).members;
		var housemates = [];
		for (var key in members) {
			housemates.push({
				id: key,
				name: members[key]
			});
		}
		return housemates;
	},
	self: function () {
		if (this && Meteor.user()) {
			if (this.id == Meteor.user()._id) return true;
		}
		return false;
	}
});
Template.recentChores.helpers({
	chores: function () {
		return Chores.find({house_id: Meteor.user().profile.house},{sort: {last_completed: -1}, limit: 5});
	}
});
Template.leastRecentChores.helpers({
	chores: function () {
		return Chores.find({house_id: Meteor.user().profile.house},{sort: {last_completed: 1}, limit: 5});
	}
});

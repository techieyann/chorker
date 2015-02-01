Template.housemates.helpers({
	self: function () {
		if (this && Meteor.user()) {
			if (this.id == Meteor.user()._id) return true;
		}
		return false;
	}
});

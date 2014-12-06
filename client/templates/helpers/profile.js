Template.profile.helpers({
	initialized: function () {
		if (Meteor.user()) {
			if (Meteor.user().profile.initialized) {
				return true;
			}
		}
		return false;
	}

});

Template.userInit.helpers({
	houses: function () {
		if (this) return this;
	}
});

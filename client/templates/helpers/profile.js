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

Template.profileReporting.helpers({
	completed: function () {
		if (this) return this.completed;
	},
	chore: function () {
		if (this) {
			return Chores.findOne(this.chore);
		}
	}
});


Template.profileReporting.rendered = function () {
	var that = this;
	Deps.autorun(function () {
		calcAndRenderProfileBar(that.data);
	});
};


changeUsernameModal = function () {
	openModal('usernameModalHeader','usernameForm','', null);
	Meteor.setTimeout(function(){$('#username-input').focus();},500);
};

Template.profile.events = {
	'click #change-username': changeUsernameModal
};


Template.userInit.helpers({
	houses: function () {
		if (this) return this;
	}
});

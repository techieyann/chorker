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

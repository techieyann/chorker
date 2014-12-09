Template.userInit.rendered = function () {
	if (Meteor.user().profile.initialized) {
		Router.go("/profile");
		return;
	}
	changeUsernameModal();
};

Template.userInit.events = {
	'click .join-house': function (e) {
		if (this) {
			openModal('joinHouseModalHeader','joinHouseForm', '', this);
			Meteor.setTimeout(function(){$('#pass').focus();},500);
		}
	}
};

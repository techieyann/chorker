Template.userInit.rendered = function () {
	openModal('usernameModalHeader','usernameForm','usernameModalFooter');
	Meteor.setTimeout(function(){$('#username-input').focus();},500);
};

Template.userInit.events = {
	'click .join-house': function (e) {
		if (this) {
			openModal('joinHouseModalHeader','joinHouseForm', '', this);
			Meteor.setTimeout(function(){$('#pass').focus();},500);
		}
	}
};

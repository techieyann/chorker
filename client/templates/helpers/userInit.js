Template.userInit.rendered = function () {
	openModal('usernameFormModalHeader','usernameForm','usernameFormModalFooter');
	Meteor.setTimeout(function(){$('#username-input').focus();},500);
};

Template.userInit.events = {
	'click .join-house': function (e) {
		if (this) {
			openModal('','joinHouseForm', '', this);
			Meteor.setTimeout(function(){$('#pass').focus();},500);
		}
	}
};
